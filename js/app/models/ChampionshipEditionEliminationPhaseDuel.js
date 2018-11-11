let ChampionshipEditionEliminationPhaseDuel = (function () {
    let _championshipEditionEliminationPhaseDuels = [];

    return class ChampionshipEditionEliminationPhaseDuel extends Entity {
        constructor(championshipEditionEliminationPhaseId, matchIds) {
            super();

            this._championshipEditionEliminationPhaseId = championshipEditionEliminationPhaseId;
            this._matchIds = matchIds;
        }

        static create(championshipEditionEliminationPhase, matches) {
            let championshipEditionEliminationPhaseDuel = new ChampionshipEditionEliminationPhaseDuel(championshipEditionEliminationPhase.id, matches.map(m => m.id));
            championshipEditionEliminationPhaseDuel.id = _championshipEditionEliminationPhaseDuels.push(championshipEditionEliminationPhaseDuel);
            championshipEditionEliminationPhase.addChampionshipEditionEliminationPhaseDuel(championshipEditionEliminationPhaseDuel);
            return championshipEditionEliminationPhaseDuel;
        }

        static load(objects) {
            _championshipEditionEliminationPhaseDuels = objects.map(o => Object.assign(new ChampionshipEditionEliminationPhaseDuel(), o));
        }

        static all() {
            return _championshipEditionEliminationPhaseDuels;
        }

        get championshipEditionEliminationPhase() {
            return ChampionshipEditionEliminationPhase.all()[this._championshipEditionEliminationPhaseId - 1];
        }

        get matches() {
            return Match.all().filterById(this._matchIds);
        }

        get clubs() {
            return this.matches[0].clubs;
        }

        get finished() {
            return this.matches.every(m => m.finished);
        }

        get aggregate() {
            if (this.finished) {
                let club1Goals = this.matches.map(m => m.getGoalsByClub(this.clubs[0])).sum();
                let club2Goals = this.matches.map(m => m.getGoalsByClub(this.clubs[1])).sum();
    
                return `${club1Goals} x ${club2Goals}`;
            }
            else
            {
                return ' x '
            }
        }

        get winner() {

        }
    }
})();