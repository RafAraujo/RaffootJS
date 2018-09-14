class _StadiumView {
    constructor(game) {
        this._game = game;

        this._tbody = document.querySelector('#stadium-table tbody');
    }

    update() {
        this._fillInfo(this._game.club.stadium);
    }

    _fillInfo(stadium) {
        Html.clearElement(this._tbody);

        let tr = this._tbody.insertRow();
        Html.insertCell(tr, 'Name', 'font-weight-bold', 'text-right');
        Html.insertCell(tr, stadium.name);

        tr = this._tbody.insertRow();
        Html.insertCell(tr, 'Capacity', 'font-weight-bold', 'text-right');
        Html.insertCell(tr, stadium.capacity.toLocaleString());
        
        tr = this._tbody.insertRow();
        Html.insertCell(tr, 'Ticket Price', 'font-weight-bold', 'text-right');
        Html.insertCell(tr, `$ ${stadium.ticketPrice.toLocaleString()}`);
    }
}