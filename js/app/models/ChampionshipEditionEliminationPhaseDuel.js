let ChampionshipEditionEliminationPhaseDuel = (function () {
    let _championshipEditionEliminationPhaseDuels = [];

    return class ChampionshipEditionEliminationPhaseDuel extends Entity {
        constructor(championshipEditionEliminationPhaseId, matchIds) {
            super();

            this._championshipEditionEliminationPhaseId = championshipEditionEliminationPhaseId;
            this._matchIds = matchIds;
        }

        static create(championshipEliminationPhase, matches) {
            let championshipEditionEliminationPhaseDuel = new ChampionshipEditionEliminationPhaseDuel(championshipEliminationPhase.id, matches.map(m => m.id));
            championshipEditionEliminationPhaseDuel.id = _championshipEditionEliminationPhaseDuels.push(championshipEditionEliminationPhaseDuel);
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
            return this.matches.first().clubs;
        }

        get finished() {
            return !this.matches.some(m => !m.finished);
        }

        get aggregate() {
            if (this.finished) {
                let club1 = this.clubs.first();
                let club2 = this.clubs.last();
    
                let club1Goals = this.matches.map(m => m.getGoalsByClub(club1)).sum();
                let club2Goals = this.matches.map(m => m.getGoalsByClub(club2)).sum();
    
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