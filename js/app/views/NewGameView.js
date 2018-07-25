class NewGameView extends View {
    constructor(element) {
        super(element);

        this._countryId = 0;
    }

    update(model) {
        this._createSelectCountries(model.countries);
        this._createSelectsClubs(model.country);

        this._countryId = $('#countries').value;
    }

    _createSelectCountries(countries) {
        if ($('#countries'))
            return;
        
        HtmlHelper.select(this._element, 'countries', countries, 'Country');
    }

    _createSelectsClubs(country) {
        let containerId = 'clubs-container';
        
        if (country == null || ($(`#${containerId}`) && this._countryId == $('#countries').value))
            return;
        
        HtmlHelper.remove($(`#${containerId}`));
        let container = HtmlHelper.create('div', containerId);
        HtmlHelper.append(this._element, container);

        HtmlHelper.lineBreak(container);
        HtmlHelper.horizontalLine(container);

        let leagues = country.leaguesCurrentSeason;

        for (let i = 0; i < country.divisionCount; i++) {
            let division = i + 1;
            let league = leagues.find(ce => ce.championship.division === division);
            let id = `clubs-division${division}`;

            HtmlHelper.select(container, id, league.clubs, `Division ${division}`);
            HtmlHelper.lineBreak(container);
        }
    }
}