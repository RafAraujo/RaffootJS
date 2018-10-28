let ChampionshipEditionEliminationPhase = (function() {
    let _championshipEditionEliminationPhases = [];

    return class ChampionshipEditionEliminationPhase extends Entity {
        constructor(championshipEditionId, clubCount) {
            super();

            this._championshipEditionId = championshipEditionId;
            this.clubCount = clubCount;
            this._championshipEditionClubIds = [];
            this._matchIds = [];
            this._championshipEditionEliminationPhaseDuelIds = [];
        }

        static create(championshipEdition, clubCount) {
            let championshipEditionEliminationPhase = new ChampionshipEditionEliminationPhase(championshipEdition.id, clubCount);
            championshipEditionEliminationPhase.id = _championshipEditionEliminationPhases.push(championshipEditionEliminationPhase);
            return championshipEditionEliminationPhase;
        }

        static load(objects) {
            _championshipEditionEliminationPhases = objects.map(o => Object.assign(new ChampionshipEditionEliminationPhase(), o));
        }

        static all() {
            return _championshipEditionEliminationPhases;
        }

        get championshipEdition() {
            return ChampionshipEdition.all()[this._championshipEditionId - 1];
        }

        get championshipEditionClubs() {
            return ChampionshipEditionClub.all().filterById(this._championshipEditionClubIds);
        }

        get clubs() {
            return this.championshipEditionClubs.map(cec => cec.club);
        }

        get matches() {
            return Match.all().filterById(this._matchIds);
        }

        get firstDate() {
            return this.matches[0].date;
        }
        
        get lastDate() {
            return this.matches.last().date;
        }

        get championshipEditionEliminationPhaseDuels() {
            return ChampionshipEditionEliminationPhaseDuel.all().filterById(this._championshipEditionEliminationPhaseDuelIds);
        }

        get name() {
            switch (this.clubCount) {
                case 8:
                    return 'Quarter-final';
                case 4:
                    return 'Semi-final';
                case 2:
                    return 'Final';
                default:
                    return `Round of ${this.clubCount}`;
            }
        }

        addChampionshipEditionEliminationPhaseDuel(championshipEditionEliminationPhaseDuel) {
            this._championshipEditionEliminationPhaseDuelIds.push(championshipEditionEliminationPhaseDuel.id);
        }

        qualify(championshipEditionClubs) {
            if (championshipEditionClubs.length !== this.clubCount)
                throw new Error('ChampionshipEditionGroup.addClub(championshipEditionClubs)');

            this._championshipEditionClubIds = championshipEditionClubs.map(cec => cec.id);
            this._defineDuels();
        }

        addMatch(match) {
            this._matchIds.push(match.id);
        }

        _defineDuels() {
            let championshipEditionClubs = this.championshipEditionClubs.slice().shuffle();
            
            for (let i = 0; i < championshipEditionClubs.length; i = i + 2) {
                let clubs = championshipEditionClubs.slice(i, i + 2).map(cec => cec.club);
                let matches = this.matches.slice(i, i + 2);

                for (let j = 0; j < 2; j++) {
                    let match = matches[j];

                    match.addClub(clubs[0], j === 0 ? 'home' : 'away');
                    match.addClub(clubs[1], j === 0 ? 'away' : 'home');
                }

                ChampionshipEditionEliminationPhaseDuel.create(this, matches);
            }
        }
    }
})();