class _PlayView {
    constructor(game) {
        this._game = game;

        this._divCanvas = document.getElementById('play-canvas');
        this._component = new FootballField(this._game.club, this._divCanvas);

        window.addEventListener('resize', this._component.draw.bind(this._component));
    }

    update() {
        this._component.build();
    }
}