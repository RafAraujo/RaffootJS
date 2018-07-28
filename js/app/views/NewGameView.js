class NewGameView extends View {
    constructor(element) {
        super(element);

        this._selectCountries = $('#countries');
        this._selectClubs = $('#clubs');
        this._countryId = 0;
    }

    update(model) {
        this._fillCountries(model.countries);
        this._fillClubs(model.country);

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
}