class HomeView {
    constructor(game) {
        this._game = game;

        this._currentSection = 'squad';

        document.getElementById('club-name').innerHTML = this._game.club.name;
        this._sections = document.querySelectorAll('section:not(#history)');
        this._aPlayerCount = document.getElementById('player-count');
        this._aMoney = document.getElementById('money');
        this._aDate = document.getElementById('date');

        this._configLinks();

        this._partialSquad = new _SquadView(this._game);
        this._partialCalendar = new _CalendarView(this._game);
        this._partialTables = new _TablesView(this._game);
    }

    _configLinks() {
        document.querySelectorAll('header a:not(.dropdown-toggle), footer a')
            .forEach(element => element.addEventListener('click', event => {
                event.preventDefault();
                this._setActiveSection.call(this, element);
                $('.navbar-collapse').collapse('hide');
            })
        );
    }

    update() {
        this._setActiveSection(document.querySelector(`a[href="#${this._currentSection}"`));

        this._partialSquad.update();
        this._partialCalendar.update();
        this._partialTables.update();

        this._fillFooter();

        $('[data-toggle="tooltip"]').tooltip();
    }

    sortSquad(orderProperties) {
        this._partialSquad.update(orderProperties);
    }

    _setActiveSection(link) {
        this._currentSection = link.getAttribute('href').substr(1);

        document.querySelectorAll('header a').forEach(e => e.classList.remove('active'));
        let span = document.querySelector('header a > span.sr-only')
        if (span)
            span.parentElement.removeChild(span);
        link.appendChild(HtmlHelper.createElement('span', '(current)', 'sr-only'));

        let active = link.classList.contains('dropdown-item') ? link.parentElement.parentElement.children[0] : document.querySelector(`header a[href='#${this._currentSection}']`);
        active.classList.add('active');

        this._sections.forEach(e => HtmlHelper.hide(e));
        HtmlHelper.show(document.getElementById(this._currentSection));
    }

    _fillFooter() {
        this._aPlayerCount.innerText = this._game.club.squad.squadPlayers.length;

        this._aMoney.innerText = `${this._game.club.money.toLocaleString()}`;
        if (this._game.club.money <= 0) {
            let bootstrapColor = Bootstrap.red();
            aMoney.parentElement.style.color = bootstrapColor.color;
            aMoney.classList.remove('text-dark', 'text-success', 'text-danger');
            aMoney.classList.add(`text-${bootstrapColor.class}`);
        }

        this._aDate.innerText = this._game.currentSeason.currentDate.toLocaleDateString();
    }
}