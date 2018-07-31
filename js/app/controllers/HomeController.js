class HomeController {
    constructor() {
        

        this._game = new Bind(new Game(), new HomeView(), 'seed', 'country');
    }
}