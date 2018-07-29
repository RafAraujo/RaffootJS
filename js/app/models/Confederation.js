let Confederation = (function() {
    let _confederations = [];

    return class Confederation {
        constructor(name) {
            this.id = _confederations.length + 1;
            this.name = name;
            this.countries = [];

            _confederations.push(this);
        }

        static seed() {
            new Confederation('America');
            new Confederation('Europe');

            Object.freeze(_confederations);
        }

        static all() {
            return _confederations;
        }

        get clubs() {
            return this.selectMany('countries.clubs');
        }

        get playableClubs() {
            return this.clubs.filter(c => c.playable);
        }

        get divisionCount() {
            return CONTINENTAL_MAX_DIVISION_COUNT;
        }

        get cupClubCount() {
            return CONTINENTAL_CUP_CLUB_COUNT;
        }

        addCountry(value) {
            this.countries.push(value);
        }

        cupName(division) {
            return this.name + ' ' + (division === 1 ? 'Champions Cup' : 'Cup');
        }
    }
})();