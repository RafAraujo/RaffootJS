let Referee = (function() {
    let _referees = [];

    return class Referee extends Entity {
        constructor(countryId, name, surname) {
            super();

            this._countryId = countryId;
            this._name = name;
            this._surname = surname;
            this.rigor = Random.numberBetween(1, 3);
        }

        static create(country) {
            let referee = new Referee(country.id, country.names.getRandomItem(), country.surnames.getRandomItem());
            referee.id = _referees.push(referee);
            return referee;
        }

        static load(objects) {
            _referees = objects.map(o => Object.assign(new Referee(), o));
        }

        static all() {
            return _referees;
        }

        static seed() {
            for (let club of Club.playable())
                _referees.push(Referee.create(club.country));

            Object.freeze(_referees);
        }

        get country() {
            return Country.all()[this.countryId - 1];
        }

        get name() {
            return this._name;
        }

        get completeName() {
            return `${this._name} ${this._surname.toUpperCase()}`;
        }
    }
})();
