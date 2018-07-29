class NewGameController {
    constructor() {
        this._selectCountries = $('#countries');

        this._game = new Bind(new Game(), new NewGameView(), 'seed', 'country');
        this._game.seed();

        this._selectCountries.addEventListener('change', this.setCountry.bind(this), {passive: true} );
    }

    setCountry() {
        this._game.country = this._game.countries.find(c => c.name == this._selectCountries.value);
    }

    setClub() {

    }
}