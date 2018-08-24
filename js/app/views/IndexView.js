class IndexView {
    constructor() {
        this._selectDatabases = $('#databases');
        this._buttonLoad = $('#load');
        this._buttonDelete = $('#delete');

        this._fillDatabases();
    }

    update(game) {
        this._buttonLoad.disabled = this._buttonDelete.disabled = game.name.length === 0;
    }

    _fillDatabases() {
        HtmlHelper.fillSelect(this._selectDatabases, ConnectionFactory.getDatabases());
    }
}