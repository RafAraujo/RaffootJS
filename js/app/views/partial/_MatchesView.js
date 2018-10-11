class _MatchesView {
    constructor(game) {
        this._game = game;

        this._matches = this._game.matchesOfTheDay();

        this._divContent = document.getElementById('matches-content');

        this._createTables();
    }

    update() {

    }

    _createTables() {
        let championshipEditions = this._matches.map(m => m.championshipEdition).distinct().filter(ce => ce.championship.country === this._game.club.country);

        championshipEditions.forEach(ce => {
            let table = Html.createTable(ce.name, ['', '', '', '', '', '', ''], 'borderless');
            let thead = table.querySelector('thead');
            let tbody = table.querySelector('tbody');

            thead.querySelector('th').classList.remove('text-center');
            thead.removeChild(thead.children[1]);

            this._matches.filter(m => m.championshipEdition === ce).forEach(m => {
                let tr = tbody.insertRow();
                
                Html.insertCell(tr, `${m.stadium.name} | ${m.attendance || 0}`, 'text-center').style.width = '25%';
                Html.insertCell(tr, m.matchClubHome.club.name, 'text-center', 'border').style.cssText = `width: 20%; background-color: ${m.matchClubHome.club.colors.background}; color: ${m.matchClubHome.club.colors.foreground}`;
                Html.insertCell(tr, m.matchClubHome.goals, 'text-center').style.width = '4%';
                Html.insertCell(tr, 'x', 'text-center').style.width = '3%';
                Html.insertCell(tr, m.matchClubAway.goals, 'text-center').style.width = '4%';
                Html.insertCell(tr, m.matchClubAway.club.name, 'text-center', 'border').style.cssText = `width: 20%; background-color: ${m.matchClubAway.club.colors.background}; color: ${m.matchClubAway.club.colors.foreground}`;
                Html.insertCell(tr, '', 'text-center').style.width = '24%';

                tbody.appendChild(tr);
            });

            this._divContent.appendChild(table);
        });

    }
}