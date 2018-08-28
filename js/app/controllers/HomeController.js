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

        
        let t0 = performance.now();

        return this._service
            .load(this._gameName)
            .then(game => {
                let t1 = performance.now();
                console.log("Call took " + (t1 - t0) + " milliseconds.");
                return game;
            })
            .catch(error => { throw error });
    }
}