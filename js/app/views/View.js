class View {
    constructor(element) {
        this._element = element;
    }

    update(model) {
        this.clear();
    }

    clear() {
        this._element.innerHTML = '';
    }
}