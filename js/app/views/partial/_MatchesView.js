class _MatchesView {
    constructor(game) {
        this._game = game;
        this._matches = this._game.currentMatches.filter(m => m.championshipEdition.championship.country === this._game.club.country);
        
        this._divTime = document.getElementById('matches-time');
        this._divContent = document.getElementById('matches-content');
        this._table = this._divContent.querySelector('table');
    }

    update() {
        this._fillTable();
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

    _fillTable() {
        let thead = this._table.querySelector('thead');
        let tbody = this._table.querySelector('tbody');

        Html.clearElement(tbody);

        thead.querySelector('th').innerText = this._matches[0].championshipEdition.name;

        this._matches.forEach(m => {
            let tr = tbody.insertRow();
            tr.id = `match-${m.id}`;
            
            Html.insertCell(tr, `${m.stadium.name} (${m.audience})`, 'text-center', 'd-none', 'd-sm-table-cell').style.width = '25%';
            
            let div = Html.createElement('div', m.matchClubHome.club.name, 'text-center');
            div.style.cssText = `max-height: 1.5rem; overflow: hidden;`;
            Html.insertCell(tr, div.outerHTML, 'text-center', 'border').style.cssText = `min-width: 8rem; background-color: ${m.matchClubHome.club.colors.background}; color: ${m.matchClubHome.club.colors.foreground}; padding: 0`;
            
            Html.insertCell(tr, 0, 'home-goals', 'text-center', 'border').style.minWidth = '2rem';
            Html.insertCell(tr, 0, 'away-goals', 'text-center', 'border').style.minWidth = '2rem';

            div = Html.createElement('div', m.matchClubAway.club.name, 'text-center');
            div.style.cssText = `max-height: 1.5rem; overflow: hidden;`;
            Html.insertCell(tr, div.outerHTML, 'text-center', 'border').style.cssText = `min-width: 8rem; background-color: ${m.matchClubAway.club.colors.background}; color: ${m.matchClubAway.club.colors.foreground}; padding: 0`;
            
            Html.insertCell(tr, '', 'match-event', 'd-none', 'd-sm-table-cell').style.width = '25%';

            tbody.appendChild(tr);
        });
    }

    _changeTime(time) {
        let progressBar = this._divTime.querySelector('.progress-bar');
        let span = this._divTime.querySelector('span');

        let value = time / 90 * 100

        progressBar.style.width = `${value}%`;
        progressBar.setAttribute('aria-valuenow', time);
        span.innerText = `${Math.round(time)}'`;
    }

    _showEvent(match, event) {
        let tr = document.getElementById(`match-${match.id}`);

        let td = tr.querySelector('.match-event');
        Html.clearElement(td);
        td.appendChild(this._getIcon(event.type));
        td.appendChild(Html.createElement('span', `${event.matchPlayer.player.name} - ${event.time}'`, 'pl-2'));

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

    _getIcon(eventType) {
        switch (eventType) {
            case 'goal':
                return Html.createIcon('futbol', 'black', 'fa-lg');
            case 'yellow card':
                return Html.createIcon('square', YELLOW, 'fa-lg');
        }
    }
}