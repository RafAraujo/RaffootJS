class ChampionshipEdition {
    constructor (championship, year) {
        this.championship = championship;
        this.year = year;

        this.championshipEditionClubs = [];
        this.groups = [];
        this.eliminationPhases = [];
        this.fixtures = [];
        this.dates = [];
        this.matches = [];
        this.championshipEditionPlayers = [];
    }

    get name() {
        return this.championship.name + ' ' + this.year;
    }

    defineClubs() {
        if (this.year === Season.firstSeason().year) {
            let clubsAbleToPlay = this.championship.clubsAbleToPlay;
            let division = this.championship.division || 1;
            let clubCount = this.championship.clubCount;
            let start = (division - 1) * clubCount;
            
            let clubs = clubsAbleToPlay.orderBy('-overall').slice(start, start + clubCount);
            clubs.forEach(c => this.championshipEditionClubs.push(new ChampionshipEditionClub(this, c)));
        }
        else {
            let previousSeason = Season.previousSeason();
            let championshipType = this.championship.championshipType;
        }
    }

    scheduleMatches(dates) {
        this.dates = dates;

        if (this.championshipEditionClubs.length === 0 || this.dates == null)
            throw new Error('ChampionshipEdition.scheduleMatches()')

        switch (this.championship.regulation) {
            case 'groups':
                this.defineGroups();
                this.defineEliminationPhases();
                this.scheduleMatchesGroups();
                break;
            case 'elimination':
                this.defineEliminationPhases();
                this.scheduleMatchesElimination();
                break;
            case 'round-robin':
                this.defineFixtures();
                this.scheduleMatchesRoundRobin();
                break;
            default:
                throw new Error('ChampionshipEdition.scheduleMatches()');
        }
    }

    defineGroups() {
        let championshipEditionClubs = this.championshipEditionClubs.slice();

        for (let i = 0; i < this.championship.groupCount; i++) {
            let group = new ChampionshipEditionGroup(this, i + 1);
            for (let j = 0; j < this.championship.groupClubCoun; j++) {
                group.addClub(championshipEditionClubs.remove(championshipEditionClubs.getRandomItem()));   
            }
            this.groups.push(group);
        }
    }

    defineEliminationPhases() {
        let clubCount = this.championship.regulation === 'groups' ?
            this.championship.groupCount * this.championship.qualifiedClubsByGroupCount :
            this.championship.clubCount;

        while (clubCount >= 2) {
            let eliminationPhase = new ChampionshipEditionEliminationPhase(this, clubCount);
            this.eliminationPhases.push(eliminationPhase);
            clubCount /= 2;
        }

        if (this.championship.regulation === 'elimination') {
            this.eliminationPhases.first().qualify(this.championshipEditionClubs);
        }
    }

    defineFixtures() {
        for (let i = 0; i < this.championship.dateCount; i++) {
            let fixture = new ChampionshipEditionFixture(this, i + 1);
            this.fixtures.push(fixture);
        }
    }

    get groupDates() {
        if (this.championship.regulation != 'groups')
            return [];
        else
            return this.dates.slice(0, this.championship.groupDatesCount - 1);
    }

    get eliminationPhaseDates() {
        if (this.championship.regulation === 'round-robin')
            return [];
        else
            return this.dates.slice(this.championship.groupDatesCount);
    }

    scheduleMatchesGroups() {
        for (let i = 0; i < this.groups.length; i++) {
            let group = this.groups[i];
            group.matches = ChampionshipEdition.genericRoundRobin(this.groupDates, group.clubs, this.championship.twoLeggedTie);
            this.matches = this.matches.concat(group.matches);
        }

        this.scheduleMatchesElimination();
    }

    scheduleMatchesElimination() {
        for (let i = 0; i < this.eliminationPhases.length; i++) {
            let eliminationPhase = this.eliminationPhases[i];
            let clubs = eliminationPhase.championshipEditionClubs.map(cec => cec.club);

            for (let j = 0; j < clubs.length; j = j + 2) {
                for (let k = 0; k < (this.championship.twoLeggedTie ? 2 : 1); k++) {
                    let date = this.eliminationPhaseDates[i + k];
                    let match = new Match(date);

                    if (clubs.length > 0) {
                        match.addClub(clubs[j], k === 0 ? 'home' : 'away');
                        match.addClub(clubs[j + 1], k === 0 ? 'away' : 'home');
                    }

                    this.matches.push(match);
                }
            }
        }
    }

    scheduleMatchesRoundRobin() {
        this.matches = ChampionshipEdition.genericRoundRobin(this, this.dates, this.championshipEditionClubs.map(cec => cec.club), this.championship.twoLeggedTie);
    }

    static genericRoundRobin(championshipEdition, dates, clubs, twoLeggedTie) {
        let matches = [];
        let rounds = (clubs.length - 1) * (twoLeggedTie ? 2 : 1);

        for (let i = 0; i < rounds; i++) {
            let date = dates[i];
            for (let j = 0; j < clubs.length / 2; j++) {
                let match  = new Match(championshipEdition, date);

                match.addClub(clubs[j], i % 2 === 0 ? 'home' : 'away');
                match.addClub(clubs[clubs.length - 1 - j], i % 2 === 0 ? 'away' : 'home');

                matches.push(match);
            }
            rotate(clubs);

            function rotate(clubs) {
                clubs.splice(1, 0, clubs.pop());
            }
        }

        return matches;
    }

    matchesOf(date) {
        return this.matches.filter(m => m.date === date);
    }

    table() {
        return this.championshipEditionClubs.orderBy('-eliminationPhasesWon', '-points', '-won', '-goalsDifference', '-goalsFor');
    }

    promotionZone() {
        return this.championship.division > 1 ? this.table().firstItems(NATIONAL_LEAGUE_PROMOTION_RELEGATION_CLUB_COUNT) : [];
    }

    relegationZone() {
        return this.championship.division < NATIONAL_MAX_DIVISION_COUNT ? this.table().lastItems(NATIONAL_LEAGUE_PROMOTION_RELEGATION_CLUB_COUNT) : [];
    }

    getChampionshipEditionPlayer(player) {
        return this.championshipEditionPlayers.find(cep => cep.player === player) ||
            this.championshipEditionPlayers[this.championshipEditionPlayers.push(new ChampionshipEditionPlayer(this, player) - 1)];
    }

    topScorers() {
        return this.championshipEditionPlayers.orderBy('-goals', 'appearances', 'timePlayed');
    }

    topAssists() {
        return this.championshipEditionPlayers.orderBy('-assists', 'appearances', 'timePlayed');
    }

    bestPlayers() {
        return this.championshipEditionPlayers.orderBy('-averageRating', 'appearances', 'timePlayed');
    }
}
