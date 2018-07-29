let FieldRegion = (function() {
    let _fieldRegions = [];

    return class FieldRegion {
        constructor(name) {
            this.name = name;
            this.positions = [];
        }

        static seed() {
            _fieldRegions.push(new FieldRegion('goal'));
            _fieldRegions.push(new FieldRegion('defense'));
            _fieldRegions.push(new FieldRegion('midfield'));
            _fieldRegions.push(new FieldRegion('attack'));

            Object.freeze(_fieldRegions);
        }

        static all() {
            return _fieldRegions;
        }

        addPosition(value) {
            this.positions.push(value);
        }

        randomPlayersCount(formation) {
            return this.name === 'goal' ?
                Random.numberBetween(2, 3) :
                Math.round(formation.fieldLocalizations.filter(fl => fl.position.fieldRegion === this).length * Random.numberBetween(15, 25) / 10);
        }
    }
})();