class _PlayersView {
    constructor(game) {
        this._game = game;

        this._divContent = document.getElementById('players-content');

        this._inputName = document.getElementById('players-name');
        this._selectCountry = document.getElementById('players-country');
        this._selectAge = document.getElementById('players-age');

        this._selectPosition = document.getElementById('players-position');
        this._selectSide = document.getElementById('players-side');

        this._selectCategory = document.getElementById('players-category');
        this._selectOverall = document.getElementById('players-overall');

        this._inputStar = document.getElementById('players-star');
        this._inputForSale = document.getElementById('players-for-sale');

        this._fillFields();
        this._component = new PlayersTable([], this._divContent, 'mt-3');

        document.querySelector('#players form').addEventListener('submit', event => {
            event.preventDefault();
            this._fillTable();
        });
    }

    update() {
        Html.clearElement(this._divContent);
    }

    _fillFields() {
        Position.all().forEach(p => this._selectPosition.appendChild(new Option(p.name, p.id)));
        Html.fillSelect(this._selectCountry, Country.all().orderBy('name'));

        this._selectAge.appendChild(new Option());
        for (let age = 16; age <= 40; age += 6)
            this._selectAge.appendChild(new Option(`${age} .. ${age + 5}`), age);

        Player.sides().forEach(s => this._selectSide.appendChild(new Option(s, s[0])));
        [''].concat(Player.categories()).forEach(c => this._selectCategory.appendChild(new Option(c, c.toLowerCase())));

        this._selectOverall.appendChild(new Option());
        for (let overall = 1; overall <= 100; overall += 10)
            this._selectOverall.appendChild(new Option(`${overall} .. ${overall + 9}`, overall));
    }

    _fillTable() {
        this._component.players = this._searchPlayers();
        this._component.build();
    }

    _searchPlayers() {
        let players = Player.all();

        if (this._inputName.value)
            players = players.filter(p => p.completeName.toLowerCase().includes(this._inputName.value.toLowerCase()));

        if (this._selectCountry.value)
            players = players.filter(p => p.country.id == this._selectCountry.value);

        if (this._selectAge.value) {
            let range = { min: parseInt(this._selectAge.value), max: parseInt(this._selectAge.value) + 5 };
            players = players.filter(p => p.age >= range.min && p.age <= range.max);
        }

        if (this._selectPosition.value)
            players = players.filter(p => Html.selectedOptions(this._selectPosition).some(positionId => p.position.id == positionId));

        if (this._selectSide.value)
            players = players.filter(p => Html.selectedOptions(this._selectSide).includes(p.side));

        if (this._selectCategory.value)
            players = players.filter(p => p.category === this._selectCategory.value);

        if (this._selectOverall.value) {
            let range = { min: parseInt(this._selectOverall.value), max: parseInt(this._selectOverall.value) + 9 };
            players = players.filter(p => p.overall >= range.min && p.overall <= range.max);
        }

        if (this._inputStar.checked)
            players = players.filter(p => p.star);

        if (this._inputForSale.checked)
            players = players.filter(p => p.forSale);

        return players;
    }
}