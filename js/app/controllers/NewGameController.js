class NewGameController {
    constructor() {
        this._game = new Bind(new Game(), new NewGameView(), 'seed', 'country');
        this._game.seed();

        $('#countries').addEventListener('change', this.setCountry.bind(this), {passive: true} );
    }

    setCountry() {
        this._game.country = this._game.countries.find(c => c.name == $('#countries').value);
    }

    setClub() {

    }
}