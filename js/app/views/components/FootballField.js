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
            this._club.squad.starting11().forEach(sp => this._drawSquadPlayer(sp, sp.fieldLocalization.position.abbreviation));
        }

        _drawSquadPlayer(squadPlayer, text) {
            let fl = squadPlayer.fieldLocalization;

            let columnWidth = this._canvas.width / 5;
            let lineHeight = this._canvas.height / 12;

            let fontSize = 20;
            this._context.font = `bold ${20}px monospace`;

            let playerWidth = columnWidth * 0.6;
            let playerHeight = playerWidth;

            this._context.strokeStyle = fl.position.fieldRegion.color.value;
            this._context.fillStyle = fl.position.fieldRegion.color.value;
            this._context.lineWidth = 2;

            this._context.strokeRect(
                columnWidth * fl.column + ((columnWidth - playerWidth) / 2),
                lineHeight * (11 - fl.line) + ((lineHeight - playerHeight) / 2),
                playerWidth,
                playerHeight
            );

            this._context.fillText(
                text,
                columnWidth * fl.column + ((columnWidth - this._context.measureText(text).width) / 2),
                lineHeight * (11 - fl.line) + ((lineHeight - playerHeight) / 2) + (playerHeight / 2)
            );

            this._context.fillStyle = 'white';
            this._context.fillRect(
                columnWidth * fl.column + ((columnWidth - Math.max(playerWidth + this._context.lineWidth * 2, this._context.measureText(squadPlayer.player.name).width)) / 2),
                lineHeight * (12 - fl.line) - fontSize,
                Math.max(playerWidth + this._context.lineWidth * 2, this._context.measureText(squadPlayer.player.name).width),
                fontSize + this._context.lineWidth
            );

            this._context.fillStyle  = 'black';
            this._context.fillText(
                squadPlayer.player.name,
                columnWidth * fl.column + ((columnWidth - this._context.measureText(squadPlayer.player.name).width) / 2),
                lineHeight * (12 - fl.line)
            );
        }

        destroy() {
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
    }
})();