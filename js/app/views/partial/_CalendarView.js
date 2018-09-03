class _CalendarView {
    constructor(game) {
        this._game = game;

        this._table = document.querySelector('#table-calendar tbody');
    }

    update() {
        for (let match of this._game.currentSeason.getMatchesByClub(this._game.club)) {
            let tr = this._table.insertRow();

            HtmlHelper.insertCell(tr, match.id, 'd-none');
            HtmlHelper.insertCell(tr, match.date.toLocaleDateString(), 'text-center');
            HtmlHelper.insertCell(tr, match.homeClub.name, 'text-left');
            HtmlHelper.insertCell(tr, match.score, 'text-center');
            HtmlHelper.insertCell(tr, match.awayClub.name, 'text-right');
            HtmlHelper.insertCell(tr, match.championshipEdition.championship.name, 'text-right');
            HtmlHelper.insertCell(tr, match.audience, 'text-center');
            HtmlHelper.insertCell(tr, match.income, 'text-center');
        }
    }
}