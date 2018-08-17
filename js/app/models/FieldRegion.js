let FieldRegion = (function() {
    let _fieldRegions = [];

    let _positions = [];

    return class FieldRegion extends Entity {
        constructor(name) {
            super();

            this.name = name;
            this._positions = [];
        }

        static create(name) {
            let fieldRegion = new FieldRegion(name);
            fieldRegion.id = _fieldRegions.push(fieldRegion);
            return fieldRegion;
        }

        static load(object) {
            let fieldRegion = new FieldRegion();
            _fieldRegions.push(Object.assign(object, fieldRegion));
            return fieldRegion;
        }

        static seed() {
            FieldRegion.create('goal');
            FieldRegion.create('defense');
            FieldRegion.create('midfield');
            FieldRegion.create('attack');

            Object.freeze(_fieldRegions);
        }

        static all() {
            return _fieldRegions;
        }

        get positions() {
            if (_positions.length === 0)
                _positions = Position.all().filter(p => p.fieldRegion === this);
            return _positions;
        }

        randomPlayersCount(formation) {
            return this.name === 'goal' ?
                Random.numberBetween(2, 3) :
                Math.round(formation.fieldLocalizations.filter(fl => fl.position.fieldRegion === this).length * Random.numberBetween(15, 25) / 10);
        }
    }
})();