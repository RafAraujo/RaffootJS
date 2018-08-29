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
            seasonYear: '',
            message: {
                text: '',
                type: 'alert-success'
            }
        };

        this._view = new IndexView();
        this._service = new GameService();

        this._selectDatabases.addEventListener('change', this._setName.bind(this));
        this._buttonLoadGame.addEventListener('click', this._loadGame.bind(this));
        this._buttonDeleteGame.addEventListener('click', this._deleteGame.bind(this));

        this._buttonNewGame.addEventListener('click', this._newGame);
        this._buttonShowSaves.addEventListener('click', this._showSaves.bind(this));
        
        this._view.update(this._game);
    }

    _showInfo() {
        this._service
            .info(this._game.name)
            .then(info => {
                this._game.clubName = info.clubName;
                this._game.seasonYear = info.seasonYear;
                this._game.name = info.name;

                this._game.message.text = '';
            })
            .catch(error => {
                this._game.message.text = "Error on showing game info";
                this._game.message.type = "alert-danger";
                console.log(error);
             })
            .then(() => this._view.update(this._game))
    }

    _loadGame() {
        window.location.href = `home.html?game=${this._game.name}#squad`;
    }

    _deleteGame() {
        this._service
            .delete(this._game.name)
            .then(() => {
                this._game.clubName = '';
                this._game.seasonYear = '';
                this._game.name = '';

                this._game.message.text = "Game deleted with success";
                this._game.message.type = "alert-success";
            })
            .catch(error => {
                this._game.message.text = "Error on deleting game";
                this._game.message.type = "alert-danger";
                console.log(error);
            })
            .then(() => this._view.update(this._game));
    }

    _newGame() {
        window.location.href = "new-game.html";
    }

    _showSaves() {
        this._game.message.text = '';
        this._view.update(this._game);
    }

    _setName() {
        this._game.name = this._selectDatabases.value;
        this._showInfo();
    }
}
