class _TablesView {
    constructor(game) {
        this._game = game;

        this._selectChampionships = document.getElementById('select-championships');
        this._tbody = document.querySelector('#table-tables tbody');
    }

    update() {
        this._fillSelect();
    }

    _fillSelect() {
        HtmlHelper.clearSelect(this._selectChampionships);

        let championshipEditions = this._game.currentSeason.championshipEditions;

        championshipEditions.forEach(ce => this._selectChampionships.appendChild(new Option(ce.championship.name, ce.id)));
        this._selectChampionships.value = this._game.club.league.id;
    }
}