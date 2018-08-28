let FieldRegion = (function() {
    let _fieldRegions = [];

    return class FieldRegion extends Entity {
        constructor(name) {
            super();

            this.name = name;
            this._positionIds = [];
        }

        static create(name) {
            let fieldRegion = new FieldRegion(name);
            fieldRegion.id = _fieldRegions.push(fieldRegion);
            return fieldRegion;
        }

        static load(objects) {
            _fieldRegions = objects.map(o => Object.assign(new FieldRegion(), o));
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
            return Position.all().filterById(this._positionIds);
        }

        addPosition(value) {
            this._positionIds.push(value.id);
        }

        randomPlayersCount(formation) {
            return this.name === 'goal' ?
                Random.numberBetween(2, 3) :
                Math.round(formation.fieldLocalizations.filter(fl => fl.position.fieldRegion === this).length * Random.numberBetween(15, 25) / 10);
        }
    }
})();