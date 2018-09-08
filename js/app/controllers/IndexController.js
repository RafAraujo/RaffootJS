class IndexController {
    constructor() {
        this._selectDatabases = document.getElementById('databases');
        this._buttonLoadGame = document.getElementById('load-game');
        this._buttonDeleteGame = document.getElementById('delete-game');

        this._buttonNewGame = document.getElementById('new-game');
        this._buttonShowSaves = document.getElementById('show-saves');

        this._game = {
            name: '',
            clubName: '',
            seasonYear: ''
        };

        this._view = new IndexView(this._game);
        this._service = new GameService();

        this._selectDatabases.addEventListener('change', this._setName.bind(this));
        this._buttonLoadGame.addEventListener('click', this._loadGame.bind(this));
        this._buttonDeleteGame.addEventListener('click', this._deleteGame.bind(this));

        this._buttonNewGame.addEventListener('click', this._newGame);
        this._buttonShowSaves.addEventListener('click', this._showSaves.bind(this));

        this._view.update();
    }

    _showInfo() {
        this._service
            .info(this._game.name)
            .then(info => {
                this._game.clubName = info.clubName;
                this._game.seasonYear = info.seasonYear;
                this._game.name = info.name;
            })
            .catch(error => {
                console.log(error);
                this._view.showMessage('Error on showing game info', 'danger');
            })
            .then(() => this._view.update())
    }

    _loadGame() {
        window.location.href = `home.html?game=${this._game.name}`;
    }

    _deleteGame() {
        this._view.showMessage('Deleting game...', 'primary');

        this._service
            .delete(this._game.name)
            .then(() => {
                this._game.clubName = '';
                this._game.seasonYear = '';
                this._game.name = '';

                this._view.showMessage('Game deleted with success', 'success');
            })
            .catch(error => {
                console.log(error);
                this._view.showMessage('Error on deleting game', 'danger');
            })
            .then(() => this._view.update());
    }

    _newGame() {
        window.location.href = "new-game.html";
    }

    _showSaves() {
        this._view.update();
    }

    _setName() {
        this._game.name = this._selectDatabases.value;
        this._showInfo();
    }
}
