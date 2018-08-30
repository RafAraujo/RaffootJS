class HomeView {
    constructor(game) {
        this._game = game;

        document.querySelectorAll('a.nav-link:not(.dropdown-toggle), a.dropdown-item')
            .forEach(e => e.addEventListener('click', () => {
                    this._setActiveSection.call(this, e);
                    $('.navbar-collapse').collapse('hide');
                })
            );
    }

    update(section) {
        this._showSquad();
        this._showCalendar();
        this._showTables();

        this._setActiveSection(document.querySelector(`a[href="#${section}"`));

        $('[data-toggle="tooltip"]').tooltip();
    }

    _showSquad() {
        let table = document.querySelector('#table-squad tbody');

        let players = this._game.club.squad.players;

        for (let player of players) {
            let tr = table.insertRow();

            HtmlHelper.insertCell(tr, player.id, 'd-none');
            HtmlHelper.insertCell(tr, player.position.abbreviation, 'text-center');
            HtmlHelper.insertCell(tr, player.star ? '&starf;' : '', 'text-center');
            HtmlHelper.insertCell(tr, player.completeName);
            HtmlHelper.insertCell(tr, player.side, 'text-center');
            HtmlHelper.insertCell(tr, player.overall, 'text-center');
            HtmlHelper.insertCell(tr, player.energy, 'text-center');

            let td = HtmlHelper.insertCell(tr, player.skillsAbbreviatedDescription, 'text-center');
            td.setAttribute('data-toggle', 'tooltip');
            td.setAttribute('data-placement', 'bottom');
            td.setAttribute('data-html', 'true');
            td.setAttribute('title', player.skillsDescription.split('/').join('<br>'));
            
            HtmlHelper.insertCell(tr, player.age, 'text-center');
            HtmlHelper.insertCell(tr, player.condition, 'text-center');
        }

        document.querySelectorAll('#table-squad td').forEach(td => td.classList.add('align-middle'));
    }

    _showCalendar() {
        let table = document.querySelector('#table-calendar tbody');

        let matches = this._game.currentSeason.getMatchesByClub(this._game.club);

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

    _showTables() {
        let table = document.querySelector('#table-tables tbody');

        let championshipEditions = this._game.currentSeason.getChampionshipEditionsByClub(this._game.club);

        HtmlHelper.fillSelect(document.getElementById('select-championships'), championshipEditions.map(ce => ce.championship));
    }

    _setActiveSection(link) {
        document.querySelectorAll('a.nav-link, a.dropdown-item').forEach(e => {
            e.classList.remove('active');
            Array.from(e.children).forEach(child => {
                if (child.tagName === 'SPAN')
                    e.removeChild(child);
            });
        });

        let active = link.classList.contains('dropdown-item') ? link.parentElement.parentElement.children[0] : link;
        active.classList.add('active');

        link.appendChild(HtmlHelper.createElement('span', '(current)', 'sr-only'));

        document.querySelectorAll('section').forEach(e => HtmlHelper.hide(e));
        HtmlHelper.show(document.getElementById(link.getAttribute("href").substr(1)));
    }
}
