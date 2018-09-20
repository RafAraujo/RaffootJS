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
            this._canvas.setAttribute('width', window.innerHeight > window.innerWidth * 1.5 ? window.innerWidth * 0.9 : this._canvas.height * 0.65);

            this._club.squad.setAutomaticLineUp();
            this._club.squad.starting11().forEach(sp => this._drawSquadPlayer(sp));
        }

        _drawSquadPlayer(squadPlayer) {
            let fieldLocalization = squadPlayer.fieldLocalization;

            let columnWidth = this._canvas.width / 5;
            let lineHeight = this._canvas.height / 12;

            this._context.font = '16px monospace';
            let textWidth = this._context.measureText('000').width;

            let playerWidth = textWidth;
            let playerHeight = playerWidth;

            this._context.strokeRect(
                columnWidth * fieldLocalization.column + ((columnWidth - playerWidth) / 2),
                lineHeight * (11 - fieldLocalization.line) + ((lineHeight - playerHeight) / 2),
                playerWidth,
                playerHeight);

            this._context.fillText(squadPlayer.player.name,
                columnWidth * fieldLocalization.column,
                lineHeight * (12 - fieldLocalization.line)
            );

            this._context.fillText(squadPlayer.overall,
                columnWidth * fieldLocalization.column + ((columnWidth - textWidth) / 2),
                lineHeight * (11 - fieldLocalization.line) + (lineHeight / 2)
            );
        }

destroy() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
}
    }
}) ();