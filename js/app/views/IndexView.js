class IndexView {
    constructor() {
        //let $ = document.querySelector.bind(document);

        this._selectDatabases = document.getElementById('databases');
        this._labelClub = document.getElementById('club');
        this._labelYear = document.getElementById('year');

        this._buttonLoad = document.getElementById('load');
        this._buttonDelete = document.getElementById('delete');
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