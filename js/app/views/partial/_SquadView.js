class _SquadView {
    constructor(game) {
        this._game = game;

        this._divContent = document.getElementById('squad-content');
        this._component = new PlayersTable(this._game.club.squad.players, this._divContent);
    }

    update() {
        this._buildTable();
    }

    _buildTable() {       
        this._component.invisibleColumns = ['Club'];
        this._component.showInfo = false;
        this._component.showLoadMore = false;
        this._component.build();
        Html.deleteColumn(this._component.table, 6);
        Html.hide(this._component.pInfo);
        Html.hide(this._component.buttonLoadMore);
    }
}
