class HomeController {
    constructor() {
        this._service = new GameService();
        this._view = new View();
    }

    get _queryString() {
        return window.location.search;
    }

    get _gameName() {
        let queryString = window.location.search;
        return decodeURIComponent(queryString.substring(queryString.indexOf('=') + 1));
    }

    loadGame() {
        let t0 = performance.now();

        this._view.showMessage('Loading game...', 'primary');

        this._service
            .load(this._gameName)
            .then(game => {
                let t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");
                this._game = game;
                this._view = new HomeView(this._game);
                this._view.update();
            })
            .catch(error => {
                console.log(error);
                this._view.showMessage('Error on loading game', 'danger');
            });
    }

    sortSquad(orderProperties) {
        this._view.sortSquad(orderProperties);
    }
}