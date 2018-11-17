class _MatchesView {
    constructor(game) {
        this._game = game;
        this._matches = this._game.currentMatches.filter(m => m.championshipEdition.championship.country === this._game.club.country);
        
        this._divTime = document.getElementById('matches-time');
        this._divContent = document.getElementById('matches-content');
    }

    update() {
        Html.clearElement(this._divContent);
        this._createTable();
    }

    firstHalfAnimation() {
        let time = 0;

        let interval = setInterval(() => {
            this._changeTime(time);
            this._matches.forEach(m => {
                let move = m.matchPlaying.moves[time];
                if (move.event)
                    this._showEvent(m, move.event);
            });
            if (++time > 45)
                clearInterval(interval);
        }, 200);
    }

    _createTable() {
        let table = Html.createTable(this._matches[0].championshipEdition.name, ['', '', '', '', '', '', ''], 'borderless');
        let thead = table.querySelector('thead');
        let tbody = table.querySelector('tbody');

        thead.querySelector('th').classList.remove('text-center');
        thead.removeChild(thead.children[1]);

        this._matches.forEach(m => {
            let tr = tbody.insertRow();
            tr.id = `match-${m.id}`;
            
            Html.insertCell(tr, `${m.stadium.name} (${m.audience})`, 'text-center', 'd-none', 'd-sm-table-cell').style.width = '25%';
            Html.insertCell(tr, m.matchClubHome.club.name, 'text-center', 'border').style.cssText = `width: 20%; background-color: ${m.matchClubHome.club.colors.background}; color: ${m.matchClubHome.club.colors.foreground}`;
            Html.insertCell(tr, 0, 'text-center', 'home-goals').style.width = '4%';
            Html.insertCell(tr, 0, 'text-center', 'away-goals').style.width = '4%';
            Html.insertCell(tr, m.matchClubAway.club.name, 'text-center', 'border').style.cssText = `width: 20%; background-color: ${m.matchClubAway.club.colors.background}; color: ${m.matchClubAway.club.colors.foreground}`;
            Html.insertCell(tr, '', 'text-center', 'match-event').style.width = '24%';

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
        let tr = document.getElementById(`match-${match.id}`);

        let td = tr.querySelector('.match-event');
        td.innerText = event.description;

        if (event.type === 'goal') {
            if (event.matchClub === match.matchClubHome) {
                td = tr.querySelector('.home-goals');
                td.innerText = parseInt(td.innerText) + 1;
            }
            else {
                td = tr.querySelector('.away-goals');
                td.innerText = parseInt(td.innerText) + 1;
            }
        }
    }
}