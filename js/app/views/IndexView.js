class IndexView {
    constructor(game) {
        //let $ = document.querySelector.bind(document);

        this._game = game;

        this._selectDatabases = document.getElementById('databases');
        this._labelClub = document.getElementById('club');
        this._labelYear = document.getElementById('year');

        this._buttonLoad = document.getElementById('load-game');
        this._buttonDelete = document.getElementById('delete-game');
        this._divMessage = document.getElementById('message');
    }

    update() {
        if (this._game.name.length === 0)
            this._fillDatabases();

        this._buttonLoad.disabled = this._buttonDelete.disabled = this._game.name.length === 0;
        this._labelClub.innerText = this._game.clubName;
        this._labelYear.innerText = this._game.seasonYear;
        this._updateMessage(this._game.message);
    }

    _fillDatabases() {
        HtmlHelper.fillSelect(this._selectDatabases, ConnectionFactory.getDatabases());
    }

    _updateMessage(message) {
        this._divMessage.innerText = message.text;
        this._divMessage.classList.remove("alert-success", "alert-danger");
        this._divMessage.classList.add(message.type);
        message.text.length > 0 ? HtmlHelper.show(this._divMessage) : HtmlHelper.hide(this._divMessage);
    }
}
