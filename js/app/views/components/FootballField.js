let FootballField = (function () {
    return class FootballField {
        constructor(club, container) {
            this._club = club;
            this._container = container;

            this._canvas = Html.createElement('canvas', '', 'football-field');
        }

        get _context() {
            return this._canvas.getContext('2d');
        }

        build() {
            this.destroy();

            this._config();

            this._container.appendChild(this._canvas);
        }

        _config() {
            this.draw();
        }

        draw() {
            this._canvas.setAttribute('height', window.innerHeight * 0.7);
            this._canvas.setAttribute('width', window.innerHeight > window.innerWidth * 1.5 ? window.innerWidth * 0.9 : this._canvas.height * 0.7);

            let formation = this._club.squad.formation;
            formation = Formation.all().getRandomItem();

            formation.fieldLocalizations.forEach(fl => {
                this._drawPlayer(fl);
            });
        }

        _drawPlayer(fieldLocalization) {
            let columnWidth = this._canvas.width / 5;
            let lineHeight = this._canvas.height / 12;

            let playerWidth = columnWidth * 0.5;
            let playerHeight = playerWidth;

            this._context.strokeRect(
                columnWidth * fieldLocalization.column + (columnWidth / 2) - (playerWidth / 2),
                lineHeight * (11 - fieldLocalization.line) + ((lineHeight - playerHeight) / 2),
                playerWidth,
                playerHeight);
        }

        destroy() {
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
    }
})();