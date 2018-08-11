class ChampionshipEdition extends Entity {
    constructor (championship, year) {
        super();

        this.championship = championship;
        this.year = year;

        this.championshipEditionClubs = [];
        this.championshipEditionGroups = [];
        this.championshipEditionEliminationPhases = [];
        this.championshipEditionFixtures = [];
        this.dates = [];
        this.matches = [];
        this.championshipEditionPlayers = [];
    }

    static load(object) {
        object.championship = Championship.all().find(c => c.name === object.championship.name);

        object.championshipEditionClubs.forEach(cec => cec = new ChampionshipEditionClub(cec.club));
        object.championshipEditionGroups.forEach(g => g = new ChampionshipEditionGroup(g.number));
        object.championshipEditionEliminationPhases.forEach(ep => ep = new ChampionshipEditionEliminationPhase(ep.clubCount));
        object.championshipEditionFixtures.forEach(f => f = new ChampionshipEditionFixture(f.number));
        object.dates.forEach(d => d = new Date(d));
        object.matches.forEach(m => m = new Match(new Date(m.date)));
        object.championshipEditionPlayers.forEach(cep => cep = ChampionshipEditionPlayer.load(cep));
    }

    get name() {
        return `${this.championship.name}  ${this.year}`;
    }

    get groupDates() {
        if (this.championship.regulation != 'championshipEditionGroups')
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

    get clubs() {
        return this.championshipEditionClubs.map(cec => cec.club);
    }

    defineClubs() {
        if (this.year === FIRST_YEAR) {
            let clubsAbleToPlay = this.championship.clubsAbleToPlay;
            let division = this.championship.division || 1;
            let clubCount = this.championship.clubCount;
            let start = (division - 1) * clubCount;
            
            let clubs = clubsAbleToPlay.orderBy('-overall').slice(start, start + clubCount);
            clubs.forEach(c => this.championshipEditionClubs.push(new ChampionshipEditionClub(c)));
        }
        else {
            let previousSeason = Season.previousSeason();
            let championshipType = this.championship.championshipType;
        }
    }

    scheduleMatches(dates) {
        this.dates = dates;

        if (this.championshipEditionClubs.length === 0 || this.dates == null)
            throw new Error('ChampionshipEdition.scheduleMatches(dates)')

        switch (this.championship.regulation) {
            case 'championshipEditionGroups':
                this.definechampionshipEditionGroups();
                this.definechampionshipEditionEliminationPhases();
                this.scheduleMatcheschampionshipEditionGroups();
                break;
            case 'elimination':
                this.definechampionshipEditionEliminationPhases();
                this.scheduleMatchesElimination();
                break;
            case 'round-robin':
                this.definechampionshipEditionFixtures();
                this.scheduleMatchesRoundRobin();
                break;
            default:
                throw new Error('ChampionshipEdition.scheduleMatches(dates)');
        }
    }

    definechampionshipEditionGroups() {
        let championshipEditionClubs = this.championshipEditionClubs.slice();

        for (let i = 0; i < this.championship.groupCount; i++) {
            let group = new ChampionshipEditionGroup(i + 1);

            for (let j = 0; j < this.championship.groupClubCount; j++) {
                let club = championshipEditionClubs.getRandomItem();
                group.addClub(club);
                championshipEditionClubs.remove(club);   
            }

            this.championshipEditionGroups.push(group);
        }
    }

    definechampionshipEditionEliminationPhases() {
        let clubCount = this.championship.regulation === 'championshipEditionGroups' ?
            this.championship.groupCount * this.championship.qualifiedClubsByGroupCount :
            this.championship.clubCount;

        while (clubCount >= 2) {
            let eliminationPhase = new ChampionshipEditionEliminationPhase(clubCount);
            this.championshipEditionEliminationPhases.push(eliminationPhase);
            clubCount /= 2;
        }

        if (this.championship.regulation === 'elimination') {
            this.championshipEditionEliminationPhases.first().qualify(this.championshipEditionClubs);
        }
    }

    definechampionshipEditionFixtures() {
        for (let i = 0; i < this.championship.dateCount; i++) {
            let fixture = new ChampionshipEditionFixture(i + 1);
            this.championshipEditionFixtures.push(fixture);
        }
    }

    scheduleMatcheschampionshipEditionGroups() {
        for (let i = 0; i < this.championshipEditionGroups.length; i++) {
            let group = this.championshipEditionGroups[i];
            group.matches = ChampionshipEdition.genericRoundRobin(this.groupDates, group.clubs, this.championship.twoLeggedTie);
            this.matches = this.matches.concat(group.matches);
        }

        this.scheduleMatchesElimination();
    }

    scheduleMatchesElimination() {
        for (let i = 0; i < this.championshipEditionEliminationPhases.length; i++) {
            let eliminationPhase = this.championshipEditionEliminationPhases[i];
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
                let match  = new Match(date);

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
        return this.championshipEditionClubs.orderBy('-championshipEditionEliminationPhasesWon', '-points', '-won', '-goalsDifference', '-goalsFor');
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