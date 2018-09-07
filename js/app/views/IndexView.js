class IndexView extends View {
    constructor(game) {
        super();

        this._game = game;

        this._selectDatabases = document.getElementById('databases');
        this._labelClub = document.getElementById('club');
        this._labelYear = document.getElementById('year');

        this._buttonLoad = document.getElementById('load-game');
        this._buttonDelete = document.getElementById('delete-game');
    }

    update() {
        if (this._game.name.length === 0)
            this._fillDatabases();

        this._buttonLoad.disabled = this._buttonDelete.disabled = this._game.name.length === 0;
        this._labelClub.innerText = this._game.clubName;
        this._labelYear.innerText = this._game.seasonYear;
    }

    _fillDatabases() {
        HtmlHelper.fillSelect(this._selectDatabases, ConnectionFactory.getDatabases());
    }
}
