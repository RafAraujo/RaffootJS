class Canvas {
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
}