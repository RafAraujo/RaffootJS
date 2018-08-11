let Confederation = (function() {
    let _confederations = [];

    return class Confederation extends Entity {
        constructor(name) {
            super();

            this.name = name;
        }

        static seed() {
            _confederations.push(new Confederation('America'));
            _confederations.push(new Confederation('Europe'));

            Object.freeze(_confederations);
        }

        static all() {
            return _confederations;
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

        cupName(division) {
            return this.name + ' ' + (division === 1 ? 'Champions Cup' : 'Cup');
        }
    }
})();