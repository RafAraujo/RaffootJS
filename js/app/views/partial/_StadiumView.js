class _StadiumView {
    constructor(game) {
        this._game = game;

        this._tbody = document.querySelector('#stadium-table tbody');
    }

    update() {
        this._fillInfo(this._game.club.stadium);
    }

    _fillInfo(stadium) {
        HtmlHelper.clearElement(this._tbody);

        let tr = this._tbody.insertRow();
        HtmlHelper.insertCell(tr, 'Name', 'font-weight-bold', 'text-right');
        HtmlHelper.insertCell(tr, stadium.name);

        tr = this._tbody.insertRow();
        HtmlHelper.insertCell(tr, 'Capacity', 'font-weight-bold', 'text-right');
        HtmlHelper.insertCell(tr, stadium.capacity.toLocaleString());
        
        tr = this._tbody.insertRow();
        HtmlHelper.insertCell(tr, 'Ticket Price', 'font-weight-bold', 'text-right');
        HtmlHelper.insertCell(tr, `$ ${stadium.ticketPrice.toLocaleString()}`);
    }
}