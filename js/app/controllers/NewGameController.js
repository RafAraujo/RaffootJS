class NewGameController {
    constructor() {
        this._selectCountries = $('#countries');
        this._selectClubs = $('#clubs');
        this._inputName = $('#name');

        this._game = new Bind(new Game(), new NewGameView(), 'seed', 'country');
        this._game.seed();

        this._selectCountries.addEventListener('change', this._setCountry.bind(this), {passive: true} );
        this._selectClubs.addEventListener('change', this._setClub.bind(this), {passive: true} );
    }

    _setCountry() {
        this._game.country = this._game.countries.find(c => c.name === this._selectCountries.value);
    }

    _setClub() {
        this._game.club = this._game.country.clubs.find(c => c.name === this._selectClubs.value && c.country === this._game.country);
    }

    _setName() {
        this._game.name = this._inputName.value;
    }

    save() {
        this._setName();
    }
}