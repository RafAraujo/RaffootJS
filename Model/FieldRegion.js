let _fieldRegions = [];

class FieldRegion {
    constructor(name) {
        this.name = name;
        this.positions = [];
    }

    static seed() {
        _fieldRegions.push(new FieldRegion('goal'));
        _fieldRegions.push(new FieldRegion('defense'));
        _fieldRegions.push(new FieldRegion('midfield'));
        _fieldRegions.push(new FieldRegion('attack'));
    }

    static all() {
        return _fieldRegions;
    }

    addPosition(value) {
        this.positions.push(value);
    }
}