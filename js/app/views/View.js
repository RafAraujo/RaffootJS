class View {
    constructor(element) {
        this._element = element;
    }

    template() {
        throw new Error("template method not implemented");
    }

    update(model) {
        this._element.innerHTML = this.template(model);
    }
}