let _confederations = [];

class Confederation {
    constructor(name) {
        this.name = name;
        this.countries = [];
    }

    static seed() {
        _confederations.push(new Confederation('America'));
        _confederations.push(new Confederation('Europe'));

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