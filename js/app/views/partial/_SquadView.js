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
        this._component.invisibleColumns = [6];
        this._component.build();
        Html.hide(this._component.pInfo);
        Html.hide(this._component.buttonLoadMore);
    }
}
