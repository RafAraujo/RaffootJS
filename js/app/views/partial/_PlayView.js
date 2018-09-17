class _PlayView {
    constructor(game) {
        this._game = game;

        this._divContent = document.getElementById('play-content');
        this._component = new FootballField(this._game.club, this._divContent);
    }

    update() {
        this._component.build();
    }
}