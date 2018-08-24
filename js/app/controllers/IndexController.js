class IndexController {
    constructor() {
        this._selectDatabases = $('#databases');
        this._labelClub = $('#club');
        this._labelYear = $('#year');
        this._buttonLoad = $('#load');

        this._game = new Bind(new Game(), new IndexView(), 'name');
        this._service = new GameService();

        this._selectDatabases.addEventListener('change', this._setName.bind(this), { passive: true } );
    }

    showDialog() {
        $('#saves').showModal();
    }

    _setName() {
        let gameName = this._selectDatabases.value;

        this._service
            .info(gameName)
            .then(info => {
                this._labelClub.innerText = info.clubName;
                this._labelYear.innerText = info.seasonYear;
                this._game.name = this._selectDatabases.value;
            })
    }

    showInfo() {

    }

    loadGame() {
        window.location.href = `home.html?game=${this._game.name}`;
    }
}