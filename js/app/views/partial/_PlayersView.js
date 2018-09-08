class _PlayersView {
    constructor(game) {
        this._game = game;

        this._divContent = document.getElementById('players-content');
        this._component = new PlayersTable('players-table', this._searchPlayers());

        document.querySelector('#players form').addEventListener('submit', event => {
            event.preventDefault();
            this._fillTable();
        });
    }


    update() {
        HtmlHelper.clearElement(this._divContent);
    }

    _fillTable() {
        this._component.setInvisibleColumns(['Energy', 'Condition']);
        this._component.build(this._divContent, 'mt-3');
    }

    _searchPlayers() {
        return Player.all().orderBy('id').firstItems(100);
    }
}