let ChampionshipEdition = (function () {
    let _championshipEditions = [];

    return class ChampionshipEdition extends Entity {
        constructor(championshipId, year) {
            super();

            this._championshipId = championshipId;
            this.year = year;
            this._championshipEditionGroupIds = [];
            this._championshipEditionEliminationPhaseIds = [];
            this._championshipEditionFixtureIds = [];
            this._championshipEditionClubIds = [];
            this._championshipEditionPlayerIds = [];
            this.dates = [];
        }

        static create(championship, year) {
            let championshipEdition = new ChampionshipEdition(championship.id, year);
            championshipEdition.id = _championshipEditions.push(championshipEdition);
            return championshipEdition;
        }

        static load(objects) {
            _championshipEditions = objects.map(o => Object.assign(new ChampionshipEdition(), o));
        }

        static all() {
            return _championshipEditions;
        }

        get championship() {
            return Championship.all()[this._championshipId - 1];
        }

        get championshipEditionGroups() {
            return ChampionshipEditionGroup.all().filterById(this._championshipEditionGroupIds);
        }

        get championshipEditionEliminationPhases() {
            return ChampionshipEditionEliminationPhase.all().filterById(this._championshipEditionEliminationPhaseIds);
        }

        get championshipEditionFixtures() {
            return ChampionshipEditionFixture.all().filterById(this._championshipEditionFixtureIds);
        }

        get championshipEditionClubs() {
            return ChampionshipEditionClub.all().filterById(this._championshipEditionClubIds);
        }

        get clubs() {
            return this.championshipEditionClubs.map(cec => cec.club);
        }

        get championshipEditionPlayers() {
            return ChampionshipEditionPlayer.all().filterById(this._championshipEditionPlayerIds);
        }

        get matches() {
            return Match.all().filter(m => m.championshipEdition === this);
        }

        get name() {
            return `${this.championship.name} ${this.year}`;
        }

        get groupDates() {
            if (this.championship.championshipType.regulation != 'groups')
                return [];
            else
                return this.dates.slice(0, this.championship.groupDatesCount - 1);
        }

        get eliminationPhaseDates() {
            if (this.championship.championshipType.regulation === 'round-robin')
                return [];
            else
                return this.dates.slice(this.championship.groupDatesCount);
        }

        get table() {
            return this.championshipEditionClubs.orderBy('-championshipEditionEliminationPhasesWon', '-points', '-won', '-goalsDifference', '-goalsFor', 'club.name');
        }

        defineClubs() {
            if (this.year === FIRST_YEAR) {
                let clubsAbleToPlay = this.championship.clubsAbleToPlay;
                let division = this.championship.division || 1;
                let clubCount = this.championship.clubCount;
                let start = (division - 1) * clubCount;

                let clubs = clubsAbleToPlay.orderBy('-squad.overall').slice(start, start + clubCount);
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

            switch (this.championship.championshipType.regulation) {
                case 'elimination':
                    this._definechampionshipEditionEliminationPhases();
                    this._scheduleMatchesElimination();
                    break;
                case 'groups':
                    this._definechampionshipEditionGroups();
                    this._definechampionshipEditionEliminationPhases();
                    this._scheduleMatcheschampionshipEditionGroups();
                    break;
                case 'round-robin':
                    this._definechampionshipEditionFixtures();
                    this._scheduleMatchesRoundRobin();
                    break;
                default:
                    throw new Error('ChampionshipEdition.scheduleMatches(dates)');
            }
        }

        _definechampionshipEditionGroups() {
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

        _definechampionshipEditionEliminationPhases() {
            let clubCount = this.championship.championshipType.regulation === 'groups' ?
                this.championship.groupCount * this.championship.qualifiedClubsByGroupCount :
                this.championship.clubCount;

            while (clubCount >= 2) {
                let eliminationPhase = ChampionshipEditionEliminationPhase.create(this, clubCount);
                this._championshipEditionEliminationPhaseIds.push(eliminationPhase.id);
                clubCount /= 2;
            }

            if (this.championship.championshipType.regulation === 'elimination') {
                this.championshipEditionEliminationPhases.first().qualify(this.championshipEditionClubs);
            }
        }

        _definechampionshipEditionFixtures() {
            for (let i = 0; i < this.championship.dateCount; i++) {
                let fixture = ChampionshipEditionFixture.create(this, i + 1);
                this._championshipEditionFixtureIds.push(fixture.id);
            }
        }

        _scheduleMatcheschampionshipEditionGroups() {
            for (let group of this.championshipEditionGroups) {
                let matches = ChampionshipEdition.genericRoundRobin(this.groupDates, group.clubs, this.championship.twoLeggedTie);
                group.addMatches(matches);
            }

            this.scheduleMatchesElimination();
        }

        _scheduleMatchesElimination() {
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
                    }
                }
            }
        }

        _scheduleMatchesRoundRobin() {
            ChampionshipEdition.genericRoundRobin(this, this.dates, this.championshipEditionClubs.map(cec => cec.club), this.championship.twoLeggedTie);
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

        hasClub(club) {
            return this.clubs.includes(club);
        }

        matchesOf(date) {
            return this.matches.filter(m => m.date === date);
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
