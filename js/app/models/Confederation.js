let Confederation = (function () {
    let _confederations = [];

    return class Confederation extends Entity {
        constructor(name) {
            super();

            this.name = name;
            this._clubIds = [];
        }

        static create(name) {
            let confederation = new Confederation(name);
            confederation.id = _confederations.push(confederation);
            return confederation;
        }

        static load(objects) {
            _confederations = objects.map(o => Object.assign(new Confederation(), o));
        }

        static all() {
            return _confederations;
        }

        static africa() {
            return _confederations[0];
        }

        static america() {
            return _confederations[1];
        }

        static asia() {
            return _confederations[2];
        }

        static europe() {
            return _confederations[3];
        }

        static seed() {
            Confederation.create('Africa');
            Confederation.create('America');
            Confederation.create('Asia');
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
            return Club.all().filterById(this._clubIds);
        }

        get playableClubs() {
            return this.clubs.filter(c => c.playable);
        }

        addClub(club) {
            this._clubIds.push(club.id);
        }

        cupName(division) {
            return `${this.name} ${(division === 1 ? 'Champions League' : 'Cup')}`;
        }
    }
})();