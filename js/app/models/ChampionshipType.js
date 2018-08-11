let ChampionshipType = (function() {
    let _championshipTypes = [];

    return class ChampionshipType extends Entity {
        constructor(scope, format, regulation, twoLeggedTie) {
            super();

            this.scope = scope;
            this.format = format;
            this.regulation = regulation;
            this.twoLeggedTie = twoLeggedTie;
        }

        static load(object) {
            let championshipType = new ChampionshipType(...Object.keys(object));
            _championshipTypes.push(championshipType);
            return championshipType;
        }

        static seed() {
            _championshipTypes.push(new ChampionshipType('national', 'cup', 'elimination', true));
            _championshipTypes.push(new ChampionshipType('national', 'league', 'round-robin', true));
            _championshipTypes.push(new ChampionshipType('continental', 'cup', 'groups', true));
            _championshipTypes.push(new ChampionshipType('continental', 'superCup', 'elimination', false));
            _championshipTypes.push(new ChampionshipType('worldwide', 'superCup', 'elimination', false));

            Object.freeze(_championshipTypes);
        }

        static all() {
            return _championshipTypes;
        }
    }
})();