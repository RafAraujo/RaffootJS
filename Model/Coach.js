let _coaches = [];

class Coach {
    constructor(country) {
        this.id = _coaches.length + 1;
        this.country = country;
        this._name = country.names.getRandomItem();
        this._surname = country.surnames.getRandomItem();

        _coaches.push(this);
    }

    set name(value) {
        this._name = value;
    }
    
    set surname(value) {
        this._surname = value;
    }
    
    get name() {
        return this._name;
    }

    get completeName() {
        return this._name + ' ' + this._surname.toUpperCase();
    }
}