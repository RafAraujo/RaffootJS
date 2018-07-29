class IndexController {
    constructor() {
        this._save = new Bind(new Game(), new IndexView(), 'load');
    }

    showDialog() {
        $('#saves').showModal();
    }
}