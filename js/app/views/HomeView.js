class HomeView {
    constructor(game) {
        this._game = game;

        this._sectionName = '';

        document.getElementById('club-name').innerHTML = this._game.club.name;
        this._configLinks();

        this._partialSquad = new _SquadView(this._game);
        this._partialCalendar = new _CalendarView(this._game);
        this._partialTables = new _TablesView(this._game);
    }

    get _defaultSection() {
        return 'squad';
    }

    get _section() {
        return this._sectionName ? this._sectionName : this._defaultSection;
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
        this._setActiveSection(document.querySelector(`a[href="#${this._section}"`));

        this._partialSquad.update();
        this._partialCalendar.update();
        this._partialTables.update();

        this._fillFooter();
    }

    sortSquad(orderProperties) {
        this._partialSquad.update(orderProperties);
    }

    _setActiveSection(link) {
        this._sectionName = link.getAttribute('href').substr(1);

        document.querySelectorAll('header a').forEach(e => {
            e.classList.remove('active');
            let span = document.querySelector('.navbar-nav a > span.sr-only')
            if (span)
                span.parentElement.removeChild(span);
        });

        let active = link.classList.contains('dropdown-item') ? link.parentElement.parentElement.children[0] : document.querySelector(`header a[href='#${this._sectionName}']`);
        active.classList.add('active');

        link.appendChild(HtmlHelper.createElement('span', '(current)', 'sr-only'));

        document.querySelectorAll('section:not(#history)').forEach(e => HtmlHelper.hide(e));
        HtmlHelper.show(document.getElementById(this._section));
    }

    _fillFooter() {
        let aPlayerCount = document.getElementById('player-count');
        let aMoney = document.getElementById('money');
        let aDate = document.getElementById('date');

        aPlayerCount.innerText = this._game.club.squad.squadPlayers.length;

        aMoney.innerText = `${this._game.club.money.toLocaleString()}`;
        if (this._game.club.money <= 0) {
            let bootstrapColor = Bootstrap.red();
            aMoney.parentElement.style.color = bootstrapColor.color;
            aMoney.classList.remove('text-dark', 'text-success', 'text-danger');
            aMoney.classList.add(`text-${bootstrapColor.class}`);
        }

        aDate.innerText = this._game.currentSeason.currentDate.toLocaleDateString();
    }
}
