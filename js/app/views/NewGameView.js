class NewGameView extends View {
    constructor() {
        super(element);

        this._pLoading = $('#loading');
        this._form = $('#form');
        HtmlHelper.hide(this._form);

        this._selectCountries = $('#countries');
        this._selectClubs = $('#clubs');

        this._imgFlag = $('#flag');

        this._countryId = 0;
    }

    update(game) {
        if (game != null) {
            HtmlHelper.hide(this._pLoading);
            HtmlHelper.show(this._form);
        }

        this._fillCountries(game.countries);
        this._fillClubs(game.country);
        //this._showFlag(game.country);

        this._countryId = $('#countries').value;
    }

    _fillCountries(countries) {
        if (this._selectCountries.options.length > 0)
            return;
        
        HtmlHelper.fillSelect(this._selectCountries, countries);
    }

    _fillClubs(country) {
        if (country == null || this._countryId == this._selectCountries.value)
            return;

        HtmlHelper.clearSelect(this._selectClubs);
        this._selectClubs.appendChild(new Option());

        let leagues = country.leaguesCurrentSeason.orderBy('championship.division');

        for (let i = 0; i < leagues.length; i++) {
            let league = leagues[i];
            let clubs = league.clubs.orderBy('name');
            let optionGroup = document.createElement('optgroup');
            optionGroup.label = `Division ${league.championship.division}`;
            
            for (let j = 0; j < clubs.length; j++) {
                let club = clubs[j];
                optionGroup.appendChild(new Option(club.name, club.id));
            }

            this._selectClubs.appendChild(optionGroup);
        }
    }

    _showFlag(country) {
        if (country == null)
            return;

        this._imgFlag.src = `${window.location.href}/../res/flags/${country.name.toLowerCase()}.svg`;
    }
}