class NewGameController {
    constructor() {
        this._game = new Bind(
            new Game(),
            new NewGameView($('#new-game')),
            'country');

        $('#countries').addEventListener('change', this.setCountry.bind(this));
    }

    setCountry() {
        let id = $('#countries').value;
        let country = this._game.countries.find(c => c.id == id);
        this._game.country = country;
    }

    setClub() {
        
    }
}