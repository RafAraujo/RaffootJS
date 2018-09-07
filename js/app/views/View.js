class View {
    constructor() {
        this._divMessage = document.getElementById('message');
    }

    showMessage(text, type) {
        this._divMessage.innerText = text;
        this._divMessage.classList.remove('alert-primary', 'alert-success', 'alert-danger', 'alert-warning');
        this._divMessage.classList.add(`alert-${type}`);
        HtmlHelper.show(this._divMessage);
    }

    hideMessage() {
        HtmlHelper.hide(this._divMessage);
    }

    update() {
        this.hideMessage();
    }
}