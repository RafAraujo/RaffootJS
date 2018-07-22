class NewGameController {
    constructor() {
        this._game = new Bind(
            new Game(),
            new NewGameView($('#new-game')), '');

        this._country = null;
        this._division = null;
        this._club = null;
    }
}