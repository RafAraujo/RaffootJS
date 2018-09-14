class View {
    constructor() {
        this._divMessage = document.getElementById('message');
    }

    showMessage(text, type) {
        this._divMessage.innerText = text;
        this._divMessage.classList.remove('alert-primary', 'alert-success', 'alert-danger', 'alert-warning');
        this._divMessage.classList.add(`alert-${type}`);
        Html.show(this._divMessage);
    }

    hideMessage() {
        Html.hide(this._divMessage);
    }

    update() {
        this.hideMessage();
    }
}