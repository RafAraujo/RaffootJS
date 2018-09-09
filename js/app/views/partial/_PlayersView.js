class _PlayersView {
    constructor(game) {
        this._game = game;

        this._divContent = document.getElementById('players-content');
        this._component = new PlayersTable('players-table', this._searchPlayers());

        this._inputName = document.getElementById('player-name');
        this._selectPosition = document.getElementById('player-position');
        this._selectSide = document.getElementById('player-side');
        this._selectCategory = document.getElementById('player-category');
        this._selectOverall = document.getElementById('player-overall');
        this._selectAge = document.getElementById('player-age');
        this._selectSkill1 = document.getElementById('player-skill-1');
        this._selectSkill2 = document.getElementById('player-skill-2');
        this._inputStar = document.getElementById('player-star');
        this._inputForSale = document.getElementById('player-for-sale');
        this._inputForLoan = document.getElementById('player-for-loan');

        this._fillFields();

        document.querySelector('#players form').addEventListener('submit', event => {
            event.preventDefault();
            this._fillTable();
        });
    }

    update() {
        HtmlHelper.clearElement(this._divContent);
    }

    _fillFields() {
        HtmlHelper.fillSelect(this._selectPosition, Position.all());
    }

    _fillTable() {
        this._component.setInvisibleColumns(['Energy', 'Condition']);
        this._component.build(this._divContent, 'mt-3');
    }

    _searchPlayers() {
        let players = Player.all();

        return Player.all().orderBy('id').firstItems(100);
    }
}