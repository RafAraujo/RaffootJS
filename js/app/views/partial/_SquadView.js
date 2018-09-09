class _SquadView {
    constructor(game) {
        this._game = game;

        this._divContent = document.getElementById('squad-content');
        this._component = new PlayersTable(this._game.club.squad.players);
    }

    update() {
        this._buildTable();
    }

    _buildTable() {       
        this._component.invisibleColumns = ['Club'];
        this._component.build(this._divContent);
    }
}
