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

        get _fontFamily() {
            return this._canvasFontFamily;
        }

        set _fontFamily(value) {
            this._canvasFontFamily = value;
            this._configFont();
        }

        get _fontSize() {
            return this._canvasFontSize;
        }

        set _fontSize(value) {
            this._canvasFontSize = value;
            this._configFont();
        }

        get _bold() {
            return this._canvasFontBold;
        }

        set _bold(value) {
            this._canvasFontBold = value;
            this._configFont();
        }

        _configFont() {
            this._context.font = `${this._canvasFontBold ? 'bold' : ''} ${this._canvasFontSize}px ${this._canvasFontFamily}`;
        }

        build() {
            this.destroy();

            this.draw();

            this._container.appendChild(this._canvas);
        }

        draw() {
            this._canvas.setAttribute('width', innerHeight > innerWidth * 1.5 ? innerWidth * 0.9 : innerWidth / 4);
            this._canvas.setAttribute('height', this._canvas.width * 1.5);

            this._club.squad.starting11.forEach(sp => this._drawSquadPlayer(sp, sp.fieldLocalization.position.abbreviation));
        }

        _drawSquadPlayer(squadPlayer, text) {
            let fl = squadPlayer.fieldLocalization;

            let columnWidth = this._canvas.width / 5;
            let lineHeight = this._canvas.height / 12;

            this._fontFamily = 'Segoe UI';
            this._fontSize = 20;

            let playerWidth = columnWidth * 0.8;
            let playerHeight = lineHeight;

            this._context.strokeStyle = fl.position.fieldRegion.color.value;
            this._context.fillStyle = fl.position.fieldRegion.color.value;
            this._context.lineWidth = 3;

            this._context.fillText(
                text,
                columnWidth * fl.column + ((columnWidth - this._context.measureText(text).width) / 2),
                lineHeight * (11 - fl.line) + ((lineHeight - playerHeight) / 2) + (playerHeight / 2)
            );
            
            this._fontSize = 14;

            this._context.strokeRect(
                columnWidth * fl.column + ((columnWidth - playerWidth) / 2),
                lineHeight * (11 - fl.line) + ((lineHeight - playerHeight) / 2),
                playerWidth,
                playerHeight - this._fontSize - this._context.lineWidth / 2
            );

            this._context.fillStyle = 'white';
            this._context.fillRect(
                columnWidth * fl.column + ((columnWidth - Math.max(playerWidth + this._context.lineWidth * 2, this._context.measureText(squadPlayer.player.name).width)) / 2),
                lineHeight * (12 - fl.line) - this._fontSize,
                Math.max(playerWidth + this._context.lineWidth * 2, this._context.measureText(squadPlayer.player.name).width),
                this._fontSize + this._context.lineWidth
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