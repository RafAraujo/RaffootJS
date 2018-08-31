class HomeView {
    constructor(game) {
        this._game = game;

        this._aPlayerCount = document.getElementById('player-count');
        this._aMoney = document.getElementById('money');
        this._aDate = document.getElementById('date');

        this._configHeader();
        this._configFooter();

        this._partialSquad = new _SquadView(this._game);
        this._partialCalendar = new _CalendarView(this._game.currentSeason.getMatchesByClub(this._game.club));
        this._partialTables = new _TablesView(this._game.currentSeason.championshipEditions);
    }

    _configHeader() {
        document.querySelectorAll('a.nav-link:not(.dropdown-toggle), a.dropdown-item')
            .forEach(element => element.addEventListener('click', () => {
                this._setActiveSection.call(this, element);
                $('.navbar-collapse').collapse('hide');
            })
        );
    }

    _configFooter() {
        this._aPlayerCount.addEventListener('click', event => {
            event.preventDefault();
            document.querySelector(`a[href="#squad"`).click();
        });
        this._aMoney.addEventListener('click', event => {
            event.preventDefault();
            document.querySelector(`a[href="#finance"`).click();
        });
        this._aDate.addEventListener('click', event => {
            event.preventDefault();
            document.querySelector(`a[href="#calendar"`).click();
        });
    }

    update(section) {
        this._setActiveSection(document.querySelector(`a[href="#${section}"`));

        this._partialSquad.update();
        this._partialCalendar.update();
        this._partialTables.update();

        this._fillFooter();
    }

    sortSquad(orderProperties) {
        this._partialSquad.update(orderProperties);
    }

    _setActiveSection(link) {
        document.querySelectorAll('a.nav-link, a.dropdown-item').forEach(e => {
            e.classList.remove('active');
            let span = document.querySelector('.navbar-nav a > span.sr-only')
            if (span)
                span.parentElement.removeChild(span);
        });

        let active = link.classList.contains('dropdown-item') ? link.parentElement.parentElement.children[0] : link;
        active.classList.add('active');

        link.appendChild(HtmlHelper.createElement('span', '(current)', 'sr-only'));

        document.querySelectorAll('section').forEach(e => HtmlHelper.hide(e));
        HtmlHelper.show(document.getElementById(link.getAttribute("href").substr(1)));
    }

    _fillFooter() {
        this._aPlayerCount.innerText = this._game.club.squad.squadPlayers.length;

        this._aMoney.innerText = `$ ${this._game.club.money.toLocaleString()}`;
        this._aMoney.classList.remove('text-success', 'text-danger');
        this._aMoney.classList.add(this._game.club.money > 0 ? 'text-success' : 'text-danger');

        this._aDate.innerText = this._game.currentSeason.currentDate.toLocaleDateString();
    }
}
