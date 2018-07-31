class Player extends Entity {
    constructor(country, birthYear, fieldRegion) {
        super();

        this.country = country;
        this._birthYear = birthYear;
        this._name = this.country.names.getRandomItem();
        this._surname = this.country.surnames.getRandomItem();
        this.position = fieldRegion.positions.getRandomItem();
        this.overall = Random.numberBetween(1, 99);
        this.star = this.overall > 90 ? Random.numberBetween(1, 10) === 10 : false;
        this.skills = this.position.skills.getRandomItems(this.star ? 3 : 2);
        this.condition = Random.numberBetween(1, 5);
        this.injuryProneness = Random.numberBetween(1, 3);
        this.energy = 100;
        this.contracts = [];
    }

    get age() {
        return Season.current().year - this._birthYear;
    }

    get name() {
        return this._name;
    }

    get completeName() {
        return `${this._name} ${this._surname.toUpperCase()}`;
    }

    get club() {
        return this.contracts.filter(c => c.inForce).last().destinationClub;
    }

    get owner() {
        return this.contracts.filter(c => c.inForce && c.type === 'definitive').destinationClub;
    }

    get baseWage() {
        return this.overall * 115 * (this.star ? 2 : 1);
    }

    addContract(value) {
        this.contracts.push(value);
    }

    get inForceContracts() {
        return this.contracts.filter(c => c.inForce);
    }

    get owner() {
        return this.inForceContracts.find(c => c.type === 'definitive');
    }

    get wage() {
        return this.inForceContracts.last().wage;
    }

    rest(time) {
        this.energy += time > 100 ? 100 : this.energy;
    }
}