let FootballField = (function () {
    return class FootballField extends Canvas {
        constructor(container) {
            super();

            this._container = container;

            this._canvas = Html.createElement('canvas', '', 'football-field');
        }

        get club() {
            return this._club;
        }

        set club(value) {
            this._club = value;
        }

        build() {
            this.destroy();

            this.draw();

            this._container.appendChild(this._canvas);
        }

        draw() {
            if (window.innerHeight > window.innerWidth * 1.5) {
                this._canvas.setAttribute('width', window.innerWidth * 0.9);
                this._canvas.setAttribute('height', window.innerWidth * 1.2);
            }
            else {
                this._canvas.setAttribute('height', 567);
                this._canvas.setAttribute('width', this._canvas.height * 0.8);
            }

            this._club.squad.starting11.forEach(sp => this._drawSquadPlayer(sp, sp.fieldLocalization.position.abbreviation));
        }

        _drawSquadPlayer(squadPlayer, text) {
            let fl = squadPlayer.fieldLocalization;

            let columnWidth = this._canvas.width / 5;
            let lineHeight = this._canvas.height / 12;

            this._fontFamily = 'Segoe UI';
            this._fontSize = 20;
            this._bold = false;
            this._context.shadowColor = 'black';
            this._context.shadowBlur = 0;

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
            
            this._fontSize = 12;

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

            this._bold = true;
            this._context.fillStyle = squadPlayer.improvised ? 'darkorange' : 'black';
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