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

            this.draw();

            this._container.appendChild(this._canvas);
        }

        draw() {
            this._canvas.setAttribute('height', window.innerHeight * 0.7);
            this._canvas.setAttribute('width', this._canvas.height * 0.7);

            this._club.squad.setAutomaticLineUp();
            this._club.squad.starting11().forEach(sp => this._drawSquadPlayer(sp));
        }

        _drawSquadPlayer(squadPlayer) {
            let fieldLocalization = squadPlayer.fieldLocalization;

            let columnWidth = this._canvas.width / 5;
            let lineHeight = this._canvas.height / 12;

            this._context.font = `bold 20px monospace`;

            let playerWidth = columnWidth * 0.6;
            let playerHeight = playerWidth;

            this._context.strokeStyle = fieldLocalization.position.fieldRegion.color.value;
            this._context.fillStyle = fieldLocalization.position.fieldRegion.color.value;
            this._context.lineWidth = 2;

            this._context.strokeRect(
                columnWidth * fieldLocalization.column + ((columnWidth - playerWidth) / 2),
                lineHeight * (11 - fieldLocalization.line) + ((lineHeight - playerHeight) / 2),
                playerWidth,
                playerHeight);

            this._context.fillText(fieldLocalization.position.abbreviation,
                columnWidth * fieldLocalization.column + ((columnWidth - this._context.measureText(fieldLocalization.position.abbreviation).width) / 2),
                lineHeight * (11 - fieldLocalization.line) + ((lineHeight - playerHeight) / 2) + (playerHeight / 2)
            );
        }

        destroy() {
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
    }
})();