let ChampionshipType = (function () {
    let _championshipTypes = [];

    return class ChampionshipType extends Entity {
        constructor(scope, format, regulation, twoLeggedTie) {
            super();

            this.scope = scope;
            this.format = format;
            this.regulation = regulation;
            this.twoLeggedTie = twoLeggedTie;
            this._championshipIds = [];
        }

        static create(scope, format, regulation, twoLeggedTie) {
            let championshipType = new ChampionshipType(scope, format, regulation, twoLeggedTie);
            championshipType.id = _championshipTypes.push(championshipType);
            return championshipType;
        }

        static load(objects) {
            _championshipTypes = objects.map(o => Object.assign(new ChampionshipType(), o));
        }

        static all() {
            return _championshipTypes;
        }

        static seed() {
            ChampionshipType.create('national', 'cup', 'elimination', true);
            ChampionshipType.create('national', 'league', 'round-robin', true);
            ChampionshipType.create('continental', 'cup', 'groups', true);
            ChampionshipType.create('continental', 'superCup', 'elimination', false);
            ChampionshipType.create('worldwide', 'superCup', 'elimination', false);

            Object.freeze(_championshipTypes);
        }

        static find(scope, format) {
            return _championshipTypes.find(ct => ct.scope === scope && ct.format === format);
        }

        get championships() {
            return Championship.all().filterById(this._championshipIds);
        }

        addChampionship(championship) {
            this._championshipIds.push(championship.id);
        }
    }
})();