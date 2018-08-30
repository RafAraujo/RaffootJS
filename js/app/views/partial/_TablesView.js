class _TablesView {
    constructor(championshipEditions) {
        this._championshipEditions = championshipEditions;

        this._selectChampionships = document.getElementById('select-championships');
        this._tbody = document.querySelector('#table-tables tbody');
    }

    update() {
        HtmlHelper.fillSelect(this._selectChampionships, this._championshipEditions.map(ce => ce.championship));
    }
}