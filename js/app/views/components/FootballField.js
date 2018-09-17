class FootballField {
    constructor(club, container) {
        this._club = club;
        this._container = container;

        this._canvas = document.createElement('canvas');
    }

    get _context() {
        return this._canvas.getContext('2d');
    }

    build() {
        this.destroy();

        this._container.appendChild(this._canvas);
    }

    destroy() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
}