class NewGameView {
    constructor() {
        this._pLoading = $('#loading');
        this._form = $('#form');
        this._selectCountries = $('#countries');
        this._selectClubs = $('#clubs');
        this._imgFlag = $('#flag');

        this._country = null;

        HtmlHelper.hide(this._form);
    }

    update(game) {
        if (game.countries.length === 0)
            return;
        
        HtmlHelper.hide(this._pLoading);
        HtmlHelper.show(this._form);

        this._fillCountries(game.countries);
        this._fillClubs(game.country, game.currentSeason);
        //this._showFlag(game.country);

        this._country = $('#countries').value;
    }

    _fillCountries(countries) {
        if (this._selectCountries.options.length > 0)
            return;
        
        HtmlHelper.fillSelect(this._selectCountries, countries.orderBy('name'));
        this._selectCountries.focus();
    }

    _fillClubs(country, season) {
        if (country == null || this._country == this._selectCountries.value)
            return;

        HtmlHelper.clearSelect(this._selectClubs);
        this._selectClubs.appendChild(new Option());

        let leagues = season.nationalLeagues.filter(c => c.championship.country === country).orderBy('championship.division');

        for (let league of leagues) {
            let clubs = league.clubs.orderBy('name');
            let optionGroup = document.createElement('optgroup');
            optionGroup.label = `Division ${league.championship.division}`;
            
            for (let club of clubs)
                optionGroup.appendChild(new Option(club.name, club.id));

            this._selectClubs.appendChild(optionGroup);
        }
    }

    _showFlag(country) {
        if (country == null)
            return;

        this._imgFlag.src = `${window.location.href}/../res/flags/${country.name.toLowerCase()}.svg`;
    }
}