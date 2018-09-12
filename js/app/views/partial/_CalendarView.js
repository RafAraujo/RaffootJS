class _CalendarView {
    constructor(game) {
        this._game = game;

        this._tbody = document.querySelector('#calendar-table tbody');
    }

    update() {
        for (let match of this._game.currentSeason.getMatchesByClub(this._game.club)) {
            let tr = this._tbody.insertRow();

            HtmlHelper.insertCell(tr, match.date.toLocaleDateString(), 'text-center');
            HtmlHelper.insertCell(tr, match.matchClubHome.club.name, 'text-left');
            HtmlHelper.insertCell(tr, match.matchClubHome.goals, 'text-center');
            HtmlHelper.insertCell(tr, 'x', 'text-center');
            HtmlHelper.insertCell(tr, match.matchClubAway.goals, 'text-center');
            HtmlHelper.insertCell(tr, match.matchClubAway.club.name, 'text-right');
            HtmlHelper.insertCell(tr, match.championshipEdition.championship.name, 'text-right');
            HtmlHelper.insertCell(tr, match.audience, 'text-center');
            HtmlHelper.insertCell(tr, match.income, 'text-center');
        }
    }
}