class _CalendarView {
    constructor(game) {
        this._game = game;

        this._tbody = document.querySelector('#calendar-table tbody');
    }

    update() {
        for (let match of this._game.currentSeason.getMatchesByClub(this._game.club)) {
            let tr = this._tbody.insertRow();

            Html.insertCell(tr, match.date.toLocaleDateString(), 'text-center');
            Html.insertCell(tr, match.matchClubHome.club.name, 'text-left');
            Html.insertCell(tr, match.matchClubHome.goals, 'text-center');
            Html.insertCell(tr, 'x', 'text-center');
            Html.insertCell(tr, match.matchClubAway.goals, 'text-center');
            Html.insertCell(tr, match.matchClubAway.club.name, 'text-right');
            Html.insertCell(tr, match.championshipEdition.championship.name, 'text-right');
            Html.insertCell(tr, match.audience, 'text-center');
            Html.insertCell(tr, match.income, 'text-center');
        }
    }
}