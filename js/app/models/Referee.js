let Referee = (function() {
    let _referees = [];

    return class Referee {
        constructor(country) {
            this.country = country;
            this._name = country.names.getRandomItem();
            this._surname = country.surnames.getRandomItem();
            this.rigor = Random.numberBetween(1, 3);
        }

        static seed() {
            let clubs = Club.playable();

            for (let i = 0; i < clubs.length; i++) {
                let country = clubs[i].country
                _referees.push(new Referee(country));
            }

            Object.freeze(_referees);
        }

        static all() {
            return _referees;
        }

        get name() {
            return this._name;
        }

        get completeName() {
            return `${this._name} ${this._surname.toUpperCase()}`;
        }
    }
})();
