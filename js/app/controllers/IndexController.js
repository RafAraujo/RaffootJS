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
        this._buttonDeleteGame.addEventListener('click', this._deleteGameAsync.bind(this));

        this._buttonNewGame.addEventListener('click', this._newGame);
        this._buttonShowSaves.addEventListener('click', this._showSaves.bind(this));

        this._view.update();
    }

    async _showInfoAsync() {
        try {
            let info = await this._service.getInfoAsync(this._game.name);
            this._game.clubName = info.clubName;
            this._game.seasonYear = info.seasonYear;
            this._game.name = info.name;
        }
        catch (error) {
            console.log(error);
            this._view.showMessage('Error on showing game info', 'danger');
        }
        this._view.update();
    }

    _loadGame() {
        location.href = `home.html?game=${this._game.name}`;
    }

    async _deleteGameAsync() {
        this._view.showMessage('Deleting game...', 'primary');

        try {
            await this._service.deleteAsync(this._game.name);
            this._game.clubName = '';
            this._game.seasonYear = '';
            this._game.name = '';

            this._view.showMessage('Game deleted with success', 'success');
        }
        catch (error) {
            console.log(error);
            this._view.showMessage('Error on deleting game', 'danger');
        }
        this._view.update();
    }

    _newGame() {
        location.href = "new-game.html";
    }

    _showSaves() {
        this._view.update();
    }

    _setName() {
        this._game.name = this._selectDatabases.value;
        this._showInfoAsync();
    }
}
