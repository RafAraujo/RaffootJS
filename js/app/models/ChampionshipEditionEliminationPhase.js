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
            return super.updateList(_championshipEditionEliminationPhases, Object.assign(new ChampionshipEditionEliminationPhase(), object));
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