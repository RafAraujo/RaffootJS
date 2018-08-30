class HomeView {
    constructor(game) {
        this._game = game;

        document.querySelectorAll('a.nav-link:not(.dropdown-toggle), a.dropdown-item')
            .forEach(element => element.addEventListener('click', () => {
                this._setActiveSection.call(this, element);
                $('.navbar-collapse').collapse('hide');
            })
        );
        
        this._partialSquad = new _SquadView(this._game.club.squad);
        this._partialCalendar = new _CalendarView(this._game.currentSeason.getMatchesByClub(this._game.club));
    }

    update(section) {
        this.showSquad();
        this.showCalendar();
        this.showTables();

        this._setActiveSection(document.querySelector(`a[href="#${section}"`));
    }

    showSquad(orderProperties) {
        this._partialSquad.update(orderProperties);
    }

    showCalendar() {
        this._partialCalendar.update();
    }

    showTables() {
        let table = document.querySelector('#table-tables tbody');

        let championshipEditions = this._game.currentSeason.getChampionshipEditionsByClub(this._game.club);

        HtmlHelper.fillSelect(document.getElementById('select-championships'), championshipEditions.map(ce => ce.championship));
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
}
