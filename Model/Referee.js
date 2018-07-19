let _referees = [];

class Referee {
    constructor(country) {
        this.country = country;
        this._name = country.names.getRandomItem();
        this._surname = country.surnames.getRandomItem();
        this.rigor = Random.numberBetween(1, 3);
    }

    static seed() {
        let countries = Country.all();

        for (let i = 0; i < countries.length; i++) {
            let country = countries[i];
            for (let j = 0; j < country.playableClubs.length / 2; j++)
                 _referees.push(new Referee(country));
        }
    }

    static all() {
        return _referees;
    }

    get name() {
        return this._name;
    }

    get completeName() {
        return this._name + ' ' + this._surname.toUpperCase();
    }
}
