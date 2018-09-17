let Country = (function () {
    let _countries = [];

    let _playerNames = [];
    let _clubNames = [];

    let _service = new CountryService();

    return class Country extends Entity {
        constructor(name, abbreviation, confederationId, playable) {
            super();

            this.name = name;
            this.abbreviation = abbreviation;
            this._confederationId = confederationId;
            this.playable = playable;
            this._clubIds = [];
        }

        static create(name, abbreviation, confederation, playable) {
            let country = new Country(name, abbreviation, confederation.id, playable);
            country.id = _countries.push(country);
            return country;
        }

        static load(objects) {
            _countries = objects.map(o => Object.assign(new Country(), o));
        }

        static seed() {
            let africa = Confederation.africa();
            let america = Confederation.america();
            let asia = Confederation.asia();
            let europe = Confederation.europe();

            Country.create('Argentina', 'ARG', america, true);
            Country.create('Brazil', 'BRA', america, true);
            Country.create('Chile', 'CHI', america, true);
            Country.create('Colombia', 'COL', america, true);
            Country.create('Ecuador', 'ECU', america, true);
            Country.create('Mexico', 'MEX', america, true);
            Country.create('Paraguay', 'PAR', america, true);
            Country.create('Uruguay', 'URU', america, true);

            Country.create('England', 'ENG', europe, true);
            Country.create('France', 'FRA', europe, true);
            Country.create('Germany', 'GER', europe, true);
            Country.create('Italy', 'ITA', europe, true);
            Country.create('Netherlands', 'NED', europe, true);
            Country.create('Portugal', 'POR', europe, true);
            Country.create('Russia', 'RUS', europe, true);
            Country.create('Spain', 'ESP', europe, true);

            Country.create('Australia', 'AUS', asia, false);
            Country.create('Austria', 'AUT', europe, false);
            Country.create('Belgium', 'BEL', europe, false);
            Country.create('Bolivia', 'BOL', america, false);
            Country.create('Bulgaria', 'BGR', europe, false);
            Country.create('Canada', 'CAN', europe, false);
            Country.create('Cameroon', 'CMR', africa, false);
            Country.create('China', 'CHN', asia, false);
            Country.create('Costa Rica', 'CRI', america, false);
            Country.create("Cote d'Ivoire", 'CIV', africa, false)
            Country.create('Croatia', 'HRV', europe, false);
            Country.create('Czech Republic', 'CZE', europe, false);
            Country.create('Denmark', 'DEN', europe, false);
            Country.create('Egypt', 'EGY', africa, false);
            Country.create('Finland', 'FIN', europe, false);
            Country.create('Greece', 'GRC', europe, false);
            Country.create('Hungary', 'HUN', europe, false);
            Country.create('Iceland', 'ISL', europe, false);
            Country.create('Iran', 'IRN', asia, false);
            Country.create('Ireland', 'IRL', africa, false);
            Country.create('Japan', 'JAP', asia, false);
            Country.create('Nigeria', 'NGA', africa, false);
            Country.create('Norway', 'NOR', europe, false);
            Country.create('Peru', 'PER', america, false);
            Country.create('Poland', 'POL', europe, false);
            Country.create('Romania', 'ROU', europe, false);
            Country.create('Saudi Arabia', 'SAU', europe, false);
            Country.create('Scotland', 'SCO', europe, false);
            Country.create('Senegal', 'SEN', africa, false);
            Country.create('Serbia', 'SER', europe, false);
            Country.create('South Africa', 'ZAF', africa, false);
            Country.create('South Korea', 'KOR', asia, false);
            Country.create('Sweden', 'SWE', europe, false);
            Country.create('Switzerland', 'CHE', europe, false);
            Country.create('Turkey', 'TUR', europe, false);
            Country.create('Ukraine', 'UKR', europe, false);
            Country.create('United States', 'USA', america, false);
            Country.create('Venezuela', 'VEN', america, false);
            Country.create('Wales', 'VEN', america, false);

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

        async getPlayerNamesAsync() {
            let object = _playerNames.find(n => n.country === this);

            if (object)
                return Promise.resolve(object.values);

            try {
                let values = await _service.getPlayerNamesAsync(this);
                _playerNames.push({ country: this, values: values });
                return _playerNames.last().values;
            }
            catch (error) {
                throw error;
            }
        }

        async getClubNamesAsync() {
            let object = _clubNames.find(n => n.country === this);

            if (object)
                return Promise.resolve(object.values);

            try {
                let values = await _service.getClubNamesAsync(this);
                _clubNames.push({ country: this, values: values });
                return _clubNames.last().values;
            }
            catch (error) {
                throw error;
            }
        }
    }
})();