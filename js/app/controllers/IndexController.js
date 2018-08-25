class IndexController {
    constructor() {
        this._selectDatabases = document.getElementById('databases');

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

        this._selectDatabases.addEventListener('change', this._setName.bind(this), { passive: true } );
        this._view.update(this._game);
    }

    newGame() {
        window.location.href = "new-game.html";
    }

    showSaves() {
        document.getElementById('saves').showModal();
    }

    _setName() {
        this._game.name = this._selectDatabases.value;
        this._showInfo();
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

    loadGame() {
        window.location.href = `home.html?game=${this._game.name}`;
    }

    deleteGame() {
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
                this._game.message.type = "alert-error";
                console.log(error);
             })
             .then(() => this._view.update(this._game));
    }
}