let Coach = (function() {
    let _coaches = [];

    return class Coach extends Entity {
        constructor(name) {
            super();

            this.name = name;
        }

        static create(country) {
            let coach = new Coach(country.names.getRandomItem());
            coach.id = _coaches.push(coach);
            return coach;
        }

        static load(object) {
            let coach = new Coach();
            _coaches.push(Object.assign(object, coach));
            return coach;
        }

        get club() {
            return Club.all().find(c => c.coach.id === this.id);
        }
    }
})();