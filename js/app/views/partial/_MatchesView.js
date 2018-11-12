class _MatchesView {
    constructor(game) {
        this._game = game;
        this._matches = this._game.currentMatches.filter(m => m.championshipEdition.championship.country === this._game.club.country);
        
        this._divTime = document.getElementById('matches-time');
        this._divContent = document.getElementById('matches-content');
    }

    update() {
        Html.clearElement(this._divContent);
        this._createTables();
    }

    firstHalfAnimation() {
        let time = 0, index = 0;

        let interval = setInterval(() => {
            this._changeTime(time);
            this._matches.forEach(m => {
                /*
                let event = m.matchPlaying.moves[index].event;
                if (event)
                    _showEvent(m, event);
                */
            });
            if ((time += 0.5) > 45)
                clearInterval(interval);
        }, 200);
    }

    _createTables() {
        let table = Html.createTable(this._matches[0].championshipEdition.name, ['', '', '', '', '', '', ''], 'borderless');
        let thead = table.querySelector('thead');
        let tbody = table.querySelector('tbody');

        thead.querySelector('th').classList.remove('text-center');
        thead.removeChild(thead.children[1]);

        this._matches.forEach(m => {
            let tr = tbody.insertRow();
            
            Html.insertCell(tr, `${m.stadium.name} | ${m.audience}`, 'text-center', 'd-none', 'd-sm-table-cell').style.width = '25%';
            Html.insertCell(tr, m.matchClubHome.club.name, 'text-center', 'border').style.cssText = `width: 20%; background-color: ${m.matchClubHome.club.colors.background}; color: ${m.matchClubHome.club.colors.foreground}`;
            Html.insertCell(tr, m.matchClubHome.goals, 'text-center').style.width = '4%';
            Html.insertCell(tr, 'x', 'text-center').style.width = '3%';
            Html.insertCell(tr, m.matchClubAway.goals, 'text-center').style.width = '4%';
            Html.insertCell(tr, m.matchClubAway.club.name, 'text-center', 'border').style.cssText = `width: 20%; background-color: ${m.matchClubAway.club.colors.background}; color: ${m.matchClubAway.club.colors.foreground}`;
            Html.insertCell(tr, '', 'text-center').style.width = '24%';

            tbody.appendChild(tr);
        });

        this._divContent.appendChild(table);
    }

    _changeTime(time) {
        let progressBar = this._divTime.querySelector('.progress-bar');
        let span = this._divTime.querySelector('span');

        let value = time / 90 * 100

        progressBar.style.width = `${value}%`;
        progressBar.setAttribute('aria-valuenow', value);
        span.innerText = `${Math.round(time)}'`;
    }

    _showEvent(match, event) {

    }
}