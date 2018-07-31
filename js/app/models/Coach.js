class Coach extends Entity {
    constructor(name = null, country = null) {
        super();

        if (!(name || country))
            throw new Error('Coach.constructor');

        this._name = name != null ? '' : country.names.getRandomItem();
        this._surname = name != null ? name : country.surnames.getRandomItem();
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
        return `${this._name} ${this._surname.toUpperCase()}`.trim();
    }

    get club() {
        return Club.all().find(c => c.coach === this);
    }
}