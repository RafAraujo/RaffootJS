class HomeController {
    constructor() {
        this._buttonPlay = document.getElementById('play-matches');
        this._selectFormations = document.getElementById('play-formations');
        this._selectsPlayers = document.querySelectorAll('#play-starting11 tbody select');

        this._service = new GameService();
        this._view = new View();

        this._buttonPlay.addEventListener('click', this._play.bind(this));
        this._selectFormations.addEventListener('change', this._setFormation.bind(this));
        Array.from(this._selectsPlayers).forEach((select, index) => select.addEventListener('change', this._changeStarting11.bind(this, select, index)));
    }

    get _gameName() {
        let queryString = location.search;
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

    _changeStarting11(select, index) {
        let squadPlayer = SquadPlayer.all()[select.value - 1];
        let fieldLocalization = this._game.club.squad.formation.fieldLocalizations.orderBy('line', 'column')[index];

        this._game.club.squad.setSquadPlayerFieldLocalization(squadPlayer, fieldLocalization);
        this._view.partialPlay.update();
    }

    _play() {
        this._game.currentMatches.forEach(m => {
            m.prepare();
            m.play();
        });

        this._service.saveAsync(this._game);

        this._view.partialMatches.update();
        this._view.setActiveSection('matches');
        this._view.partialMatches.animation();
    }
}