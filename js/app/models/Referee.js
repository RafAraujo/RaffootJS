let Referee = (function () {
    let _referees = [];

    return class Referee extends Entity {
        constructor(countryId, name, surname, rigor) {
            super();

            this._countryId = countryId;
            this._name = name;
            this._surname = surname;
            this.rigor = rigor;
        }

        static async createAsync(country) {
            let names = await country.getPlayerNamesAsync();
            let referee = new Referee(country.id, names.getRandomItem(), names.getRandomItem(), Random.numberBetween(1, 3));
            referee.id = _referees.push(referee);
            return referee;
        }

        static load(objects) {
            _referees = objects.map(o => Object.assign(new Referee(), o));
        }

        static all() {
            return _referees;
        }

        static async seedAsync() {
            for (let club of Club.playable()) {
                let referee = await Referee.createAsync(club.country);
                _referees.push(referee);
            }

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