let Confederation = (function() {
    let _confederations = [];

    return class Confederation extends Entity {
        constructor(name) {
            super();

            this.name = name;
            this._clubs = null;
        }

        static create(name) {
            let confederation = new Confederation(name);
            confederation.id = _confederations.push(confederation);
            return confederation;
        }

        static load(object) {
            let confederation = new Confederation();
            _confederations.push(Object.assign(object, confederation));
            return confederation;
        }

        static all() {
            return _confederations;
        }

        static seed() {
            Confederation.create('America');
            Confederation.create('Europe');

            Object.freeze(_confederations);
        }

        get divisionCount() {
            return CONTINENTAL_MAX_DIVISION_COUNT;
        }

        get cupClubCount() {
            return CONTINENTAL_CUP_CLUB_COUNT;
        }

        get clubs() {
            if (this._clubs.length === 0)
                this._clubs = Club.all().filter(c => c.country.confederation === this);
            return this._clubs;
        }

        get playableClubs() {
            return this.clubs.filter(c => c.playable);
        }

        cupName(division) {
            return this.name + ' ' + (division === 1 ? 'Champions Cup' : 'Cup');
        }
    }
})();