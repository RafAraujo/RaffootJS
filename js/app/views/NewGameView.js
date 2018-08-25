class NewGameView {
    constructor() {
        this._divLoading = document.getElementById('loading');
        this._form = document.getElementById('form');
        this._selectCountries = document.getElementById('countries');
        this._selectClubs = document.getElementById('clubs');
        this._imgFlag = document.getElementById('flag');
        this._buttonBack = document.getElementById('back');
        this._buttonStart = document.getElementById('start');
        this._divStarting = document.getElementById('starting');

        this._country = null;

        HtmlHelper.hide(this._form);
    }

    update(game) {
        if (game.countries.length === 0)
            return;
        
        if (game.name.length  === 0)
            this._changed(game);
        else if (game.name.length > 0)
            this._starting();
    }

    _changed(game) {
        HtmlHelper.hide(this._divLoading);
        HtmlHelper.show(this._form);
        HtmlHelper.hide(this._divStarting);

        this._fillCountries(game.countries);
        this._fillClubs(game.country, game.currentSeason);

        this._country = document.getElementById('countries').value;
    }

    _starting() {
        this._buttonBack.disabled = true;
        this._buttonStart.disabled = true;
        HtmlHelper.show(this._divStarting);
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
            let optionGroup = document.createElement('optgroup');
            optionGroup.label = `Division ${league.championship.division}`;
            
            for (let club of league.clubs.orderBy('name'))
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