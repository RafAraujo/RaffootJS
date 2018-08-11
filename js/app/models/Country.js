let Country = (function() {
    let _countries = [];

    return class Country extends Entity {
        constructor(name, abbreviation, confederation, countryLanguage, playable) {
            super();

            this.name = name;
            this.abbreviation = abbreviation;
            this.countryLanguage = countryLanguage;
            this.confederation = confederation;
            this.playable = playable;

            this._stadiums = [];
            this._clubs = [];
        }

        static load(object) {
            
        }

        static seed() {
            let confederations = Confederation.all();

            let america = confederations.find(c => c.name === 'America');
            let europe = confederations.find(c => c.name === 'Europe');

            let countryLanguages = CountryLanguage.all();

            _countries.push(new Country('Argentina', 'ARG', america, countryLanguages.find(cl => cl.name === 'spanish'), true));
            _countries.push(new Country('Brazil', 'BRA', america, countryLanguages.find(cl => cl.name === 'portuguese'), true));
            _countries.push(new Country('Chile', 'CHI', america, countryLanguages.find(cl => cl.name === 'spanish'), true));
            _countries.push(new Country('Colombia', 'COL', america, countryLanguages.find(cl => cl.name === 'spanish'), true));
            _countries.push(new Country('Ecuador', 'ECU', america, countryLanguages.find(cl => cl.name === 'spanish'), true));
            _countries.push(new Country('Mexico', 'MEX', america, countryLanguages.find(cl => cl.name === 'spanish'), true));
            _countries.push(new Country('Paraguay', 'PAR', america, countryLanguages.find(cl => cl.name === 'spanish'), true));
            _countries.push(new Country('Uruguay', 'URU', america, countryLanguages.find(cl => cl.name === 'spanish'), true));

            _countries.push(new Country('France', 'FRA', europe, countryLanguages.find(cl => cl.name === 'french'), true));
            _countries.push(new Country('England', 'ENG', europe, countryLanguages.find(cl => cl.name === 'english'), true));
            _countries.push(new Country('Germany', 'GER', europe, countryLanguages.find(cl => cl.name === 'deutsche'), true));
            _countries.push(new Country('Italy', 'ITA', europe, countryLanguages.find(cl => cl.name === 'italian'), true));
            _countries.push(new Country('Netherlands', 'NED', europe, countryLanguages.find(cl => cl.name === 'dutch'), true));
            _countries.push(new Country('Portugal', 'POR', europe, countryLanguages.find(cl => cl.name === 'portuguese'), true));
            _countries.push(new Country('Russia', 'RUS', europe, countryLanguages.find(cl => cl.name === 'russian'), true));
            _countries.push(new Country('Spain', 'ESP', europe, countryLanguages.find(cl => cl.name === 'spanish'), true));
            
            Object.freeze(_countries);
        }

        static all() {
            return _countries;
        }

        static playable() {
            return _countries.filter(c => c.playable);
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
            if (this._stadiums.length === 0)
                this._stadiums = Stadium.all().filter(s => s.country === this);
            return this._stadiums;
        }

        get clubs() {
            if (this._clubs.length === 0)
                this._clubs = Club.all().filter(c => c.country === this);
            return this._clubs;
        }

        get playableClubs() {
            return this.clubs.filter(c => c.playable);
        }
    }
})();