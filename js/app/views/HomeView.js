class HomeView extends View {
    constructor(game) {
        super();

        this._game = game;
        this._currentSection = 'play';

        document.getElementById('club-name').innerHTML = this._game.club.name;

        this._sections = document.querySelectorAll('section:not(#history)');
        this._aPlayerCount = document.getElementById('player-count');
        this._aMoney = document.getElementById('money');
        this._aDate = document.getElementById('date');
        this._modalPlayer = document.getElementById('player-modal');

        this._configLinks();

        this.partialPlay = new _PlayView(this._game);
        this.partialSquad = new _SquadView(this._game);
        this.partialCalendar = new _CalendarView(this._game);
        this.partialTables = new _TablesView(this._game);
        this.partialStadium = new _StadiumView(this._game);
        this.partialClubs = new _ClubsView(this._game);
        this.partialPlayers = new _PlayersView(this._game);

        $(`#${this._modalPlayer.id}`).on('show.bs.modal', event => this._showPlayer($(event.relatedTarget).data('player-id')));
    }

    _configLinks() {
        document.querySelectorAll('header a:not(.dropdown-toggle)')
            .forEach(element => element.addEventListener('click', event => {
                event.preventDefault();
                this._setActiveSection.call(this, element);
                $('.navbar-collapse').collapse('hide');
            })
            );
    }

    update() {
        let t0 = performance.now();

        super.update();

        this._setActiveSection(document.querySelector(`a[href="#${this._currentSection}"`));

        this.partialPlay.update();
        this.partialSquad.update();
        this.partialCalendar.update();
        this.partialTables.update();
        this.partialStadium.update();
        this.partialPlayers.update();

        console.log("Interface took " + (performance.now() - t0) + " milliseconds.");
    }

    sortSquad(orderProperties) {
        this.partialSquad.update(orderProperties);
    }

    _setActiveSection(link) {
        let href = link.getAttribute('href').substr(1);
        if (!href)
            return;

        this._currentSection = href;

        document.querySelectorAll('header a').forEach(e => e.classList.remove('active'));
        let span = document.querySelector('header a > span.sr-only');
        if (span)
            span.parentElement.removeChild(span);
        link.appendChild(Html.createElement('span', '(current)', 'sr-only'));

        let active = link.classList.contains('dropdown-item') ? link.parentElement.parentElement.children[0] : link;
        active.classList.add('active');

        this._sections.forEach(e => Html.hide(e));
        Html.show(document.getElementById(this._currentSection));
        scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    _showPlayer(id) {
        let player = Player.all()[id - 1];

        let title = this._modalPlayer.querySelector('.modal-title');
        title.innerText = player.completeName;

        let tbody = this._modalPlayer.querySelector('table tbody');
        Html.clearElement(tbody);
        let tr = null;

        tr = tbody.insertRow();
        Html.insertCell(tr, 'Position', 'font-weight-bold', 'text-right');
        Html.insertCell(tr, player.completePosition);

        tr = tbody.insertRow();
        Html.insertCell(tr, 'Overall', 'font-weight-bold', 'text-right');
        Html.insertCell(tr, this._divOverall(player).outerHTML);

        tr = tbody.insertRow();
        Html.insertCell(tr, 'Skills', 'font-weight-bold', 'text-right');
        Html.insertCell(tr, player.skillsDescription);

        tr = tbody.insertRow();
        Html.insertCell(tr, 'Country', 'font-weight-bold', 'text-right');
        Html.insertCell(tr, this._divCountry(player.country).outerHTML);
        
        tr = tbody.insertRow();
        Html.insertCell(tr, 'Age', 'font-weight-bold', 'text-right');
        Html.insertCell(tr, player.age);

        tr = tbody.insertRow();
        Html.insertCell(tr, 'Club', 'font-weight-bold', 'text-right');
        Html.insertCell(tr, player.club.name);

        tr = tbody.insertRow();
        Html.insertCell(tr, 'Value ($)', 'font-weight-bold', 'text-right');
        Html.insertCell(tr, player.marketValue.toLocaleString());

        tr = tbody.insertRow();
        Html.insertCell(tr, 'Wage ($)', 'font-weight-bold', 'text-right');
        Html.insertCell(tr, player.wage.toLocaleString());

    }

    _divCountry(country) {
        let div = Html.createElement('div', '');
        let span = Html.createImage(country.flag, country.name, 'img-miniature', 'border', 'mr-2');
        div.appendChild(span);
        span = Html.createElement('span', country.name);
        div.appendChild(span);
        return div;
    }

    _divOverall(player) {
        let div = Html.createElement('div', '');
        let span = Html.createElement('span', player.overall, 'overall', `bg-${player.category}`);
        div.appendChild(span);
        if (player.star) {
            let span = Html.createIcon('star', YELLOW);
            span.classList.add('overall', 'player-star', 'ml-1');
            div.appendChild(span);
        }
        return div;
    }
}