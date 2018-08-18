let ChampionshipEditionEliminationPhase = (function() {
    let _championshipEditionEliminationPhases = [];

    return class ChampionshipEditionEliminationPhase extends Entity {
        constructor(championshipEditionId, clubCount) {
            super();

            this._championshipEditionId = championshipEditionId;
            this.clubCount = clubCount;
            this._championshipEditionClubIds = [];
        }

        static create(championshipEdition, clubCount) {
            let championshipEditionEliminationPhase = new ChampionshipEditionEliminationPhase(championshipEdition.id, clubCount);
            championshipEditionEliminationPhase.id = _championshipEditionEliminationPhases.push(championshipEditionEliminationPhase);
            return championshipEditionEliminationPhase;
        }

        static load(object) {
            let championshipEditionEliminationPhase = new ChampionshipEditionEliminationPhase();
            _championshipEditionEliminationPhases.push(Object.assign(object, championshipEditionEliminationPhase));
            return championshipEditionEliminationPhase;          
        }

        static all() {
            return _championshipEditionEliminationPhases;
        }

        get championshipEdition() {
            return ChampionshipEdition.all()[this._championshipEditionId - 1];
        }

        get championshipEditionClubs() {
            let championshipEditionClubs = [];
            this._championshipEditionClubIds.forEach(cecId => championshipEditionClubs.push(ChampionshipEditionClub.all()[cecId - 1]));
            return championshipEditionClubs;
        }

        get matches() {
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
                    return 'Round of ' + this.clubCount.toString();
            }
        }

        qualify(championshipEditionClubs) {
            if (championshipEditionClubs.length !== this.clubCount)
                throw new Error('ChampionshipEditionGroup.addClub(championshipEditionClubs)');

            this._championshipEditionClubIds = championshipEditionClubs.map(cec => cec.id);
        }
    }
})();