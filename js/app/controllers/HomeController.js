class HomeController {
    constructor() {
        this._service = new GameService();

        this._loadGame();
    }

    get _gameName() {
        let queryString = window.location.search;
        return queryString.substring(queryString.indexOf('=') + 1);
    }

    _loadGame() {
        this._service
            .load(this._gameName)
            .catch(error => { throw error });
    }
}