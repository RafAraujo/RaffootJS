class _CalendarView {
    constructor(game) {
        this._game = game;

        this._table = document.getElementById('calendar-table');
    }

    update() {
        let tbody = this._table.querySelector('tbody');

        for (let match of this._game.currentSeason.getMatchesByClub(this._game.club)) {
            let tr = tbody.insertRow();

            Html.insertCell(tr, match.date.toLocaleDateString(), 'text-center');
            Html.insertCell(tr, match.matchClubHome.club.name, 'text-left');
            Html.insertCell(tr, match.matchClubHome.goals, 'text-center');
            Html.insertCell(tr, 'x', 'text-center', 'pl-0', 'pr-0');
            Html.insertCell(tr, match.matchClubAway.goals, 'text-center');
            Html.insertCell(tr, match.matchClubAway.club.name, 'text-right');
            Html.insertCell(tr, match.championshipEdition.championship.name, 'text-right');
            Html.insertCell(tr, match.audience || '', 'text-center');
            Html.insertCell(tr, match.income, 'text-center');
        }

        this._optimizeTableForMobile();
    }

    _optimizeTableForMobile() {
        Array.from(this._table.children).filter(section => section != null).forEach(section => {
            Array.from(section.children).forEach(row => {
                Array.from(row.children).forEach((cell, index) => {
                    if (index === 0 || index > 5)
                        cell.classList.add('d-none', 'd-sm-table-cell');
                });
            });
        });
    }
}