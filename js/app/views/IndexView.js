class IndexView {
    constructor() {
        this._selectDatabases = $('#databases');
        this._labelClub = $('#club');
        this._labelYear = $('#year');
        this._buttonLoad = $('#load');
        this._buttonDelete = $('#delete');
    }

    update(game) {
        if (game.name.length === 0)
            this._fillDatabases();

        this._buttonLoad.disabled = this._buttonDelete.disabled = game.name.length === 0;
        this._labelClub.innerText = game.clubName;
        this._labelYear.innerText = game.seasonYear;
    }

    _fillDatabases() {
        HtmlHelper.fillSelect(this._selectDatabases, ConnectionFactory.getDatabases());
    }
}