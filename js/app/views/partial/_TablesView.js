class _TablesView {
    constructor(game) {
        this._game = game;

        this._selectChampionships = document.getElementById('select-championships');
        this._tbody = document.querySelector('#table-tables tbody');

        this._fillSelect();
        this._selectChampionships.addEventListener('click', this._showTable.bind(this));
    }

    update() {
        this._showTable();
    }

    _fillSelect() {
        HtmlHelper.clearSelect(this._selectChampionships);

        let championshipEditions = this._game.currentSeason.championshipEditions;

        championshipEditions.forEach(ce => this._selectChampionships.appendChild(new Option(ce.championship.name, ce.id)));
        this._selectChampionships.value = this._game.club.league.id;
    }

    _showTable() {
        let championshipEdition = ChampionshipEdition.all().find(ce => ce.id == this._selectChampionships.value);
        alert(championshipEdition.name);
    }
}