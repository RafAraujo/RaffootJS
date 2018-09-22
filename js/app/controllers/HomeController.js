class HomeController {
    constructor() {
        this._selectFormations = document.getElementById('play-formations');
        this._selectsPlayers = document.getElementsByClassName('play-starting11-player-name');

        this._service = new GameService();
        this._view = new View();

        this._selectFormations.addEventListener('change', this._setFormation.bind(this));
        Array.from(this._selectsPlayers).forEach(select => select.addEventListener('change', this._changeStarting11.bind(this, select)));
    }

    get _gameName() {
        let queryString = window.location.search;
        return decodeURIComponent(queryString.substring(queryString.indexOf('=') + 1).trim());
    }

    async loadGameAsync() {
        let t0 = performance.now();

        if (this._gameName === '')
            document.location.href = 'index.html';

        this._view.showMessage('Loading game...', 'primary');

        try {
            let game = await this._service.loadAsync(this._gameName);
            console.log('Call took ' + (performance.now() - t0) + ' milliseconds.');
            this._game = game;
            this._view = new HomeView(this._game);
            this._view.update();
        }
        catch (error) {
            console.log(error);
            this._view.showMessage('Error on loading game', 'danger');
        }
    }

    _setFormation() {
        this._game.club.squad.formation = Formation.all()[this._selectFormations.value - 1];
        this._view.partialPlay.update();
    }

    _changeStarting11(select) {
        let squadPlayer = SquadPlayer.all()[select.value - 1];
        let fieldLocalization = fieldLocalization.all()[parseInt(select.getAttribute('data-field-localization-id'))];

        this._game.club.squad.setSquadPlayerFieldLocalization(squadPlayer, fieldLocalization);
        this._view.partialPlay.update();
    }
}