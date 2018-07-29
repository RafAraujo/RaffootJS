let ChampionshipType = (function() {
    let _championshipTypes = [];

    return class ChampionshipType {
        constructor(scope, format, regulation, twoLeggedTie) {
            this.id = _championshipTypes.length + 1;
            this.scope = scope;
            this.format = format;
            this.regulation = regulation;
            this.twoLeggedTie = twoLeggedTie;
            this.championships = [];

            _championshipTypes.push(this);
        }

        static seed() {
            new ChampionshipType('national', 'cup', 'elimination', true);
            new ChampionshipType('national', 'league', 'round-robin', true);
            new ChampionshipType('continental', 'cup', 'groups', true);
            new ChampionshipType('continental', 'superCup', 'elimination', false);
            new ChampionshipType('worldwide', 'superCup', 'elimination', false);

            Object.freeze(_championshipTypes);
        }

        static all() {
            return _championshipTypes;
        }

        addChampionship(value) {
            this.championships.push(value);
        }
    }
})();