let Coach = (function() {
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

        static load(object) {
            return super.updateList(_coaches, Object.assign(new Coach(), object));
        }

        static all() {
            return _coaches;
        }

        get club() {
            return Club.all().find(c => c.coach.id === this.id);
        }
    }
})();