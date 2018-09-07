let Country = (function () {
    let _countries = [];

    return class Country extends Entity {
        constructor(name, abbreviation, confederationId, countryLanguageId, playable) {
            super();

            this.name = name;
            this.abbreviation = abbreviation;
            this._confederationId = confederationId;
            this._countryLanguageId = countryLanguageId;
            this.playable = playable;
            this._clubIds = [];
            this._stadiumIds = [];
        }

        static create(name, abbreviation, confederation, countryLanguage, playable) {
            let country = new Country(name, abbreviation, confederation.id, countryLanguage.id, playable);
            country.id = _countries.push(country);
            return country;
        }

        static load(objects) {
            _countries = objects.map(o => Object.assign(new Country(), o));
        }

        static seed() {
            let confederations = Confederation.all();

            let america = confederations[0];
            let europe = confederations[1];

            let countryLanguages = CountryLanguage.all();

            Country.create('Argentina', 'ARG', america, countryLanguages.find(cl => cl.name === 'spanish'), true);
            Country.create('Brazil', 'BRA', america, countryLanguages.find(cl => cl.name === 'portuguese'), true);
            Country.create('Chile', 'CHI', america, countryLanguages.find(cl => cl.name === 'spanish'), true);
            Country.create('Colombia', 'COL', america, countryLanguages.find(cl => cl.name === 'spanish'), true);
            Country.create('Ecuador', 'ECU', america, countryLanguages.find(cl => cl.name === 'spanish'), true);
            Country.create('Mexico', 'MEX', america, countryLanguages.find(cl => cl.name === 'spanish'), true);
            Country.create('Paraguay', 'PAR', america, countryLanguages.find(cl => cl.name === 'spanish'), true);
            Country.create('Uruguay', 'URU', america, countryLanguages.find(cl => cl.name === 'spanish'), true);

            Country.create('England', 'ENG', europe, countryLanguages.find(cl => cl.name === 'english'), true);
            Country.create('France', 'FRA', europe, countryLanguages.find(cl => cl.name === 'french'), true);
            Country.create('Germany', 'GER', europe, countryLanguages.find(cl => cl.name === 'deutsche'), true);
            Country.create('Italy', 'ITA', europe, countryLanguages.find(cl => cl.name === 'italian'), true);
            Country.create('Netherlands', 'NED', europe, countryLanguages.find(cl => cl.name === 'dutch'), true);
            Country.create('Portugal', 'POR', europe, countryLanguages.find(cl => cl.name === 'portuguese'), true);
            Country.create('Russia', 'RUS', europe, countryLanguages.find(cl => cl.name === 'russian'), true);
            Country.create('Spain', 'ESP', europe, countryLanguages.find(cl => cl.name === 'spanish'), true);

            Object.freeze(_countries);
        }

        static all() {
            return _countries;
        }

        static playable() {
            return _countries.filter(c => c.playable);
        }

        get confederation() {
            return Confederation.all()[this._confederationId - 1];
        }

        get countryLanguage() {
            return CountryLanguage.all()[this._countryLanguageId - 1];
        }

        get names() {
            return this.countryLanguage.names;
        }

        get surnames() {
            return this.countryLanguage.surnames;
        }

        get playableClubsCount() {
            return Math.max(this.leagueClubCount * this.divisionCount);
        }

        get divisionCount() {
            return Math.min(Math.floor(this.clubs.length / NATIONAL_LEAGUE_CLUB_COUNT), NATIONAL_MAX_DIVISION_COUNT);
        }

        get leagueClubCount() {
            return NATIONAL_LEAGUE_CLUB_COUNT;
        }

        get cupClubCount() {
            let count = NATIONAL_CUP_MAX_CLUB_COUNT;
            while (count > this.playableClubsCount)
                count /= 2;
            return count;
        }

        get stadiums() {
            return Stadium.all().filterById(this._stadiumIds);
        }

        get clubs() {
            return Club.all().filterById(this._clubIds);
        }

        get playableClubs() {
            return this.clubs.filter(c => c.playable);
        }

        get flag() {
            return `${window.location.pathname}/../../res/flags/${this.name.toLowerCase()}.svg`;
        }

        addClub(club) {
            this._clubIds.push(club.id);
            this.confederation.addClub(club);
        }

        addStadium(stadium) {
            this._stadiumIds.push(stadium.id);
        }
    }
})();