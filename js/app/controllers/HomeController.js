class HomeController {
    constructor() {
        this._service = new GameService();
        this._loadGame()
            .then(game => this._game = new Bind(game, new HomeView()))
            .catch(error => { throw error });
    }

    get _gameName() {
        let queryString = window.location.search;
        return queryString.substring(queryString.indexOf('=') + 1);
    }

    _loadGame() {
        return this._service
            .load(this._gameName)
            .catch(error => { throw error });
    }
}