let FieldRegion = (function () {
    let _fieldRegions = [];

    return class FieldRegion extends Entity {
        constructor(name, color) {
            super();

            this.name = name;
            this.color = color;
            this._positionIds = [];
        }

        static create(name, color) {
            let fieldRegion = new FieldRegion(name, color);
            fieldRegion.id = _fieldRegions.push(fieldRegion);
            return fieldRegion;
        }

        static load(objects) {
            _fieldRegions = objects.map(o => Object.assign(new FieldRegion(), o));
        }

        static seed() {
            FieldRegion.create('goal', { value: YELLOW, class: 'warning' });
            FieldRegion.create('defense', { value: BLUE, class: 'primary' });
            FieldRegion.create('midfield', { value: GREEN, class: 'success' });
            FieldRegion.create('attack', { value: RED, class: 'danger' });

            Object.freeze(_fieldRegions);
        }

        static all() {
            return _fieldRegions;
        }

        static find(name) {
            return _fieldRegions.find(fr => fr.name ===  name);
        }

        get positions() {
            return Position.all().filterById(this._positionIds);
        }

        addPosition(value) {
            this._positionIds.push(value.id);
        }
    }
})();