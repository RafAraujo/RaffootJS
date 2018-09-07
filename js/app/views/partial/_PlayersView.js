class _PlayersView {
    constructor(game) {
        this._game = game;

        this._divContent = document.getElementById('players-content');
        this._component = new PlayersTable(this._searchPlayers());

        document.querySelector('#players form').addEventListener('submit', event => {
            event.preventDefault();
            this._fillTable();
        });
    }


    update() {
    }

    _fillTable() {
        let table = this._component.build();
        table.classList.add('mt-3');
        this._divContent.appendChild(table);
    }

    _searchPlayers() {
        return Player.all().firstItems(500);
    }
}