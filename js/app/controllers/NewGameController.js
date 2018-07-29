class NewGameController {
    constructor() {
        this._game = new Bind(new Game(), new NewGameView(), 'seed', 'country');
        this._game.seed();

        $('#countries').addEventListener('change', this.setCountry.bind(this), {passive: true} );
    }

    setCountry() {
        let id = $('#countries').value;
        let country = this._game.countries.find(c => c.id == id);
        this._game.country = country;
    }

    setClub() {

    }
}