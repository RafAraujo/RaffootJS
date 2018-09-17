class HomeController {
    constructor() {
        this._service = new GameService();
        this._view = new View();
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
}