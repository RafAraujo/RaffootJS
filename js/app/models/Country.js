let Country = (function () {
    let _countries = [];

    let _names = [];

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
            Country.create('Argentina', 'ARG', Confederation.america(), true);
            Country.create('Brazil', 'BRA', Confederation.america(), true);
            Country.create('Chile', 'CHI', Confederation.america(), true);
            Country.create('Colombia', 'COL', Confederation.america(), true);
            Country.create('Ecuador', 'ECU', Confederation.america(), true);
            Country.create('Mexico', 'MEX', Confederation.america(), true);
            Country.create('Paraguay', 'PAR', Confederation.america(), true);
            Country.create('Uruguay', 'URU', Confederation.america(), true);

            Country.create('England', 'ENG', Confederation.europe(), true);
            Country.create('France', 'FRA', Confederation.europe(), true);
            Country.create('Germany', 'GER', Confederation.europe(), true);
            Country.create('Italy', 'ITA', Confederation.europe(), true);
            Country.create('Netherlands', 'NED', Confederation.europe(), true);
            Country.create('Portugal', 'POR', Confederation.europe(), true);
            Country.create('Russia', 'RUS', Confederation.europe(), true);
            Country.create('Spain', 'ESP', Confederation.europe(), true);

            Country.create('Australia', 'AUS', Confederation.asia(), false);
            Country.create('Austria', 'AUT', Confederation.europe(), false);
            Country.create('Belgium', 'BEL', Confederation.europe(), false);
            Country.create('Bolivia', 'BOL', Confederation.america(), false);
            Country.create('Bulgaria', 'BGR', Confederation.europe(), false);
            Country.create('Canada', 'CAN', Confederation.europe(), false);
            Country.create('Cameroon', 'CMR', Confederation.africa(), false);
            Country.create('China', 'CHN', Confederation.asia(), false);
            Country.create('Costa Rica', 'CRI', Confederation.america(), false);
            Country.create('Cote d\'Ivoire', 'CIV', Confederation.africa(), false)
            Country.create('Croatia', 'HRV', Confederation.europe(), false);
            Country.create('Czech Republic', 'CZE', Confederation.europe(), false);
            Country.create('Denmark', 'DEN', Confederation.europe(), false);
            Country.create('Egypt', 'EGY', Confederation.africa(), false);
            Country.create('Finland', 'FIN', Confederation.europe(), false);
            Country.create('Greece', 'GRC', Confederation.europe(), false);
            Country.create('Iceland', 'ISL', Confederation.europe(), false);
            Country.create('Ireland', 'IRL', Confederation.africa(), false);
            Country.create('Hungary', 'HUN', Confederation.europe(), false);
            Country.create('Japan', 'JAP', Confederation.asia(), false);
            Country.create('Nigeria', 'NGA', Confederation.africa(), false);
            Country.create('Norway', 'NOR', Confederation.europe(), false);
            Country.create('Peru', 'PER', Confederation.america(), false);
            Country.create('Poland', 'POL', Confederation.europe(), false);
            Country.create('Romania', 'ROU', Confederation.europe(), false);
            Country.create('Saudi Arabia', 'SAU', Confederation.europe(), false);
            Country.create('Senegal', 'SEN', Confederation.africa(), false);
            Country.create('Serbia', 'SER', Confederation.europe(), false);
            Country.create('Slovenia', 'SVN', Confederation.europe(), false);
            Country.create('South Africa', 'ZAF', Confederation.africa(), false);
            Country.create('South Korea', 'KOR', Confederation.asia(), false);
            Country.create('Sweden', 'SWE', Confederation.europe(), false);
            Country.create('Switzerland', 'CHE', Confederation.europe(), false);
            Country.create('Turkey', 'TUR', Confederation.europe(), false);
            Country.create('Ukraine', 'UKR', Confederation.europe(), false);
            Country.create('United States', 'USA', Confederation.america(), false);
            Country.create('Venezuela', 'VEN', Confederation.america(), false);
            Country.create('Wales', 'VEN', Confederation.america(), false);

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

        get names() {
            return ['Rafael', 'Araujo', 'Costa', 'Oliveira'];

            return fetch(`http://c3420952.r52.cf0.rackcdn.com/${this.abbreviation}playerdata.xml`)
                .then(response => response.text())
                .then(text => {
                    let xml = new window.DOMParser().parseFromString(text, 'text/xml');
                    let tags = Array.from(xml.getElementsByTagName('P'));
                    _names = tags.map(t => t.getAttribute('f'));
                    _names = _names.concat(tags.map(t => t.getAttribute('s')));
                    _names = [...new Set(_names)];
                    return _names.sort();
                })
                .catch(error => console.log(error));
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
    }
})();