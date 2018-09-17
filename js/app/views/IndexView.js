class IndexView extends View {
    constructor(game) {
        super();

        this._game = game;

        this._selectDatabases = document.getElementById('databases');
        this._tdClub = document.getElementById('club');
        this._tdYear = document.getElementById('year');

        this._buttonLoad = document.getElementById('load-game');
        this._buttonDelete = document.getElementById('delete-game');
    }

    update() {
        if (this._game.name.length === 0)
            this._fillDatabases();

        this._buttonLoad.disabled = this._buttonDelete.disabled = this._game.name.length === 0;
        this._tdClub.innerText = this._game.clubName;
        this._tdYear.innerText = this._game.seasonYear;
    }

    _fillDatabases() {
        Html.fillSelect(this._selectDatabases, ConnectionFactory.getDatabases());
    }
}
