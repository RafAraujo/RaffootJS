class FootballField {
    constructor(club, container) {
        this._club = club;
        this._container = container;

        this._canvas = Html.createElement('canvas', '', 'football-field');
    }

    get _context() {
        return this._canvas.getContext('2d');
    }

    _config() {
        this._canvas.setAttribute('height', window.innerHeight * 0.7);
        this._canvas.setAttribute('width', window.innerHeight > window.innerWidth * 1.5 ? window.innerWidth * 0.9: this._canvas.height * 0.7);
        this._context.fillStyle = 'green';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    build() {
        this.destroy();

        this._config();

        this._container.appendChild(this._canvas);
    }

    destroy() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
}