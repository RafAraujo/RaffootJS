let Stadium = (function () {
    let _stadiums = [];

    return class Stadium extends Entity {
        constructor(name, capacity, ticketPrice) {
            super();

            this.name = name;
            this.capacity = capacity;
            this.ticketPrice = ticketPrice;
        }

        static create(name, ticketPrice) {
            let stadium = new Stadium(name,  Random.numberBetween(10000, 50000), ticketPrice);
            stadium.id = _stadiums.push(stadium);
            return stadium;
        }

        static load(objects) {
            _stadiums = objects.map(o => Object.assign(new Stadium(), o));
        }

        static all() {
            return _stadiums;
        }

        static baseTicketPrice(clubDivision) {
            return 20 - (clubDivision - 1) * 5;
        }
    }
})();