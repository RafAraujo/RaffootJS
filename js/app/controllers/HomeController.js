class HomeController {
    constructor() {
        this._service = new GameService();

        this._loadGame();
    }

    get _gameName() {
        let queryString = window.location.search;
        return queryString.substring(queryString.indexOf('=') + 1);
    }

    async _loadGame() {
        let t0 = performance.now();

        await this._service
            .load(this._gameName)
            .catch(error => { throw error });

        let t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");
    }
}