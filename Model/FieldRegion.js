let _fieldRegions = [];

class FieldRegion {
    constructor(name) {
        this.id = _fieldRegions.length + 1;
        this.name = name;
        this.positions = [];

        _fieldRegions.push(this);
    }

    static seed() {
        new FieldRegion('goal');
        new FieldRegion('defense');
        new FieldRegion('midfield');
        new FieldRegion('attack');

        Object.freeze(_fieldRegions);
    }

    static all() {
        return _fieldRegions;
    }

    addPosition(value) {
        this.positions.push(value);
    }
}