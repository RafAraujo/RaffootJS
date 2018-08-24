class IndexController {
    constructor() {
        this._selectDatabases = $('#databases');

        this._game = new Bind({ name: '', clubName: '', seasonYear: '' }, new IndexView(), 'name');
        this._service = new GameService();

        this._selectDatabases.addEventListener('change', this._setName.bind(this), { passive: true } );
    }

    showDialog() {
        $('#saves').showModal();
    }

    _setName() {
        this._game.name = this._selectDatabases.value;
        this._showInfo();
    }

    _showInfo() {
        if (this._game.name.length > 0)
        {
            this._service
                .info(this._game.name)
                .then(info => {
                    this._game.clubName = info.clubName;
                    this._game.seasonYear = info.seasonYear;
                    this._game.name = info.name;
                })
                .catch(error => { throw error });
        }
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
            })
            .catch(error => { throw error });
    }
}