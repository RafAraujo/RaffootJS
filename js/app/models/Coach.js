let Coach = (function () {
    let _coaches = [];

    return class Coach extends Entity {
        constructor(name) {
            super();

            this.name = name;
        }

        static create(country = null, name = null) {
            if (country != null)
                name = country.names.getRandomItem();

            let coach = new Coach(name);
            coach.id = _coaches.push(coach);
            return coach;
        }

        static load(objects) {
            _coaches = objects.map(o => Object.assign(new Coach(), o));
        }

        static all() {
            return _coaches;
        }

        get club() {
            return Club.all().find(c => c.coach === this);
        }
    }
})();