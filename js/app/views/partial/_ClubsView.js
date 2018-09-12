class _ClubsView {
    constructor(game) {
        this._game = game;

        this._selectCountry = document.getElementById('clubs-country');
        this._selectClub = document.getElementById('clubs-club');

        this._fillCountries();
        this._selectCountry.value = this._game.club.country.id;
        this._fillClubs();
        this._selectClub.value = this._game.club.id;

        this._selectCountry.addEventListener('change', this._fillClubs.bind(this));
    }

    _fillCountries() {
        this._game.countries.forEach(c => this._selectCountry.appendChild(new Option(c.name, c.id)));
    }

    _fillClubs() {
        HtmlHelper.clearSelect(this._selectClub);

        let leagues = this._game.currentSeason.nationalLeagues.filter(ce => ce.championship.country.id == this._selectCountry.value).orderBy('championship.division');

        for (let league of leagues) {
            let optionGroup = document.createElement('optgroup');
            optionGroup.label = `Division ${league.championship.division}`;
            league.clubs.orderBy('name').forEach(c => optionGroup.appendChild(new Option(c.name, c.id)));
            this._selectClub.appendChild(optionGroup);
        }
    }
}