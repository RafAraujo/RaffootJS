let ChampionshipEdition = (function() {
    let _championshipEditions = [];

    return class ChampionshipEdition extends Entity {
        constructor (championshipId, year) {
            super();

            this._championshipId = championshipId;
            this.year = year;

            this._championshipEditionGroupIds = [];
            this._championshipEditionEliminationPhaseIds = [];
            this._championshipEditionFixtureIds = [];
            this._championshipEditionClubIds = [];
            this._championshipEditionPlayerIds = [];

            this.dates = [];

            this._matchIds = [];
        }

        static create(championship, year) {
            let championshipEdition = new ChampionshipEdition(championship.id, year);
            championshipEdition.id = _championshipEditions.push(championshipEdition);
            return championshipEdition;
        }

        static load(object) {
            let championshipEdition = super.updateList(_championshipEditions, Object.assign(new ChampionshipEdition(), object));
            championshipEdition.dates.forEach(d => d = new Date(d));
            return championshipEdition;
        }

        static all() {
            return _championshipEditions;
        }

        get championship() {
            return Championship.all()[this._championshipId - 1];
        }

        get championshipEditionGroups() {
            return ChampionshipEditionGroup.all().filter(ceg => ceg.championshipEdition === this);
        }

        get championshipEditionEliminationPhases() {
            return ChampionshipEditionEliminationPhase.all().filter(ceep => ceep.championshipEdition === this);
        }

        get championshipEditionFixtures() {
            return ChampionshipEditionFixture.all().filter(cef => cef.championshipEdition === this);
        }

        get championshipEditionClubs() {
            return ChampionshipEditionClub.all().filter(cec => cec.championshipEdition === this);
        }

        get championshipEditionPlayers() {
            return ChampionshipEditionPlayer.all().filter(cep => cep.championshipEdition === this);
        }

        get matches() {
            return Match.all().filter(m => m.championshipEdition === this);
        }

        get name() {
            return `${this.championship.name} ${this.year}`;
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
                clubs.forEach(c => this._championshipEditionClubIds.push(ChampionshipEditionClub.create(this, c).id));
            }
            else {
                let previousSeason = Season.previousSeason();
                let championshipType = this.championship.championshipType;
            }
        }

        scheduleMatches(dates) {
            this.dates = dates;

            if (this._championshipEditionClubIds.length === 0 || this.dates == null)
                throw new Error('ChampionshipEdition.scheduleMatches(dates)')

            switch (this.championship.regulation) {
                case 'groups':
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
                let group = ChampionshipEditionGroup.create(this, i + 1);

                for (let j = 0; j < this.championship.groupClubCount; j++) {
                    let club = championshipEditionClubs.getRandomItem();
                    group.addClub(club);
                    championshipEditionClubs.remove(club);   
                }

                this._championshipEditionGroupIdss.push(group.id);
            }
        }

        definechampionshipEditionEliminationPhases() {
            let clubCount = this.championship.regulation === 'groups' ?
                this.championship.groupCount * this.championship.qualifiedClubsByGroupCount :
                this.championship.clubCount;

            while (clubCount >= 2) {
                let eliminationPhase = ChampionshipEditionEliminationPhase.create(this, clubCount);
                this._championshipEditionEliminationPhaseIds.push(eliminationPhase.id);
                clubCount /= 2;
            }

            if (this.championship.regulation === 'elimination') {
                this.championshipEditionEliminationPhases.first().qualify(this.championshipEditionClubs);
            }
        }

        definechampionshipEditionFixtures() {
            for (let i = 0; i < this.championship.dateCount; i++) {
                let fixture = ChampionshipEditionFixture.create(this, i + 1);
                this._championshipEditionFixtureIds.push(fixture.id);
            }
        }

        scheduleMatcheschampionshipEditionGroups() {
            let groups = this.championshipEditionGroups;

            for (let i = 0; i < groups.length; i++) {
                let group = this.groups[i];
                group.matchIds = ChampionshipEdition.genericRoundRobin(this.groupDates, group.clubs, this.championship.twoLeggedTie).map(m => m.id);
                this._matchIds = this._matchIds.concat(group.matches.map(m => m.id));
            }

            this.scheduleMatchesElimination();
        }

        scheduleMatchesElimination() {
            let eliminationPhases = this.championshipEditionEliminationPhases;

            for (let i = 0; i < eliminationPhases.length; i++) {
                let eliminationPhase = eliminationPhases[i];
                let clubs = eliminationPhase.championshipEditionClubs.map(cec => cec.club);

                for (let j = 0; j < clubs.length; j = j + 2) {
                    for (let k = 0; k < (this.championship.twoLeggedTie ? 2 : 1); k++) {
                        let date = this.eliminationPhaseDates[i + k];
                        let match = Match.create(this, date);

                        if (clubs.length > 0) {
                            match.addClub(clubs[j], k === 0 ? 'home' : 'away');
                            match.addClub(clubs[j + 1], k === 0 ? 'away' : 'home');
                        }

                        this._matchIds.push(match.id);
                    }
                }
            }
        }

        scheduleMatchesRoundRobin() {
            let matches = ChampionshipEdition.genericRoundRobin(this, this.dates, this.championshipEditionClubs.map(cec => cec.club), this.championship.twoLeggedTie);
            this._matchIds = this._matchIds.concat(matches.map(m => m.id));
        }

        static genericRoundRobin(championshipEdition, dates, clubs, twoLeggedTie) {
            let matches = [];
            let rounds = (clubs.length - 1) * (twoLeggedTie ? 2 : 1);

            for (let i = 0; i < rounds; i++) {
                let date = dates[i];
                for (let j = 0; j < clubs.length / 2; j++) {
                    let match = Match.create(championshipEdition, date);

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
            return this.championshipEditionPlayers.find(cep => cep.player === player);
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
})();