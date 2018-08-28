class HomeView {
    constructor() {

    }

    update(game, section) {
        this._showSquad(game.club.squad);

        this._showCalendar(game.currentSeason.getMatchesByClub(game.club));
    }

    _showSquad(squad) {
        let table = document.querySelector('#table-squad tbody');

        for (let player of squad.players) {
            let tr = table.insertRow();

            HtmlHelper.insertCell(tr, player.id, 'd-none');
            HtmlHelper.insertCell(tr, player.position.abbreviation, 'text-center');
            HtmlHelper.insertCell(tr, player.star ? '&starf;' : '', 'text-center');
            HtmlHelper.insertCell(tr, player.completeName);
            HtmlHelper.insertCell(tr, player.side, 'text-center');
            HtmlHelper.insertCell(tr, player.overall, 'text-center');
            HtmlHelper.insertCell(tr, player.energy, 'text-center');

            let td = HtmlHelper.insertCell(tr, player.skills.map(s => s.abbreviation).toString().replace(',', '/'), 'text-center');
            td.setAttribute('data-toggle', 'tooltip');
            td.setAttribute('data-placement', 'bottom');
            td.setAttribute('data-html', 'true');
            td.setAttribute('title', player.skills.map(s => s.name).toString().replace(',', '<br>'));
            
            HtmlHelper.insertCell(tr, player.age, 'text-center');
            HtmlHelper.insertCell(tr, player.condition, 'text-center');
        }

        document.querySelectorAll('#table-squad td').forEach(td => td.classList.add('align-middle'));
        $('[data-toggle="tooltip"]').tooltip();
    }

    _showCalendar(matches) {
        let table = document.querySelector('#table-calendar tbody');

        for (let match of matches) {
            let tr = table.insertRow();

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