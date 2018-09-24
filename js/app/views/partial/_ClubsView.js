class _ClubsView {
    constructor(game) {
        this._game = game;

        this._selectCountry = document.getElementById('clubs-country');
        this._selectClub = document.getElementById('clubs-club');
        this._divSquad = document.getElementById('clubs-squad');

        this._fillCountries();

        this._component = new PlayersTable([], this._divSquad);

        this._selectCountry.addEventListener('change', this._changeCountry.bind(this));
        this._selectClub.addEventListener('change', this._fillSquad.bind(this));
    }

    _fillCountries() {
        Html.fillSelect(this._selectCountry, this._game.countries);
    }

    _changeCountry() {
        this._fillClubs();
        this._component.destroy();
    }

    _fillClubs() {
        Html.clearSelect(this._selectClub);
        this._selectClub.appendChild(new Option());

        let leagues = this._game.currentSeason.nationalLeagues.filter(ce => ce.championship.country.id == this._selectCountry.value).orderBy('championship.division');

        leagues.forEach(league => {
            let optionGroup = document.createElement('optgroup');
            optionGroup.label = `Division ${league.championship.division}`;
            league.clubs.orderBy('name').forEach(c => optionGroup.appendChild(new Option(c.name, c.id)));
            this._selectClub.appendChild(optionGroup);
        });
    }

    _fillSquad() {
        this._component.players = Club.all()[this._selectClub.value - 1].squad.players;
        this._component.build();
        Html.deleteColumn(this._component.table, 6);
        Html.hide(this._component.pInfo);
        Html.hide(this._component.buttonLoadMore);
    }
}