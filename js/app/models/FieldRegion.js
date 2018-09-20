let FieldRegion = (function () {
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

        get color() {
            switch (this.name) {
                case 'goal':
                    return { value: YELLOW, class: 'warning' };
                case 'defense':
                    return { value: BLUE, class: 'primary' };
                case 'midfield':
                    return { value: GREEN, class: 'success' };
                case 'attack':
                    return { value: RED, class: 'danger' };
            }
        }

        addPosition(value) {
            this._positionIds.push(value.id);
        }
    }
})();