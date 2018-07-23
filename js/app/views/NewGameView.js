class NewGameView extends View {
    constructor(_element) {
        super(_element);
    }

    update(model) {
        this._createSelectCountries(model.countries);
        this._createSelectsDivisions(model.country);
    }

    _createSelectCountries(countries) {
        if ($('#countries'))
            return;
        
        let select = HtmlHelper.newSelect('countries', countries);
        this._element.appendChild(select);
    }

    _createSelectsDivisions(country) {
        if (country == null || $('#countries').value == country.id)
            return;

        this._element.appendChild(document.createElement('br'));
        this._element.appendChild(document.createElement('hr'));

        let leagues = country.leaguesCurrentSeason;

        for (let i = 0; i < country.divisionCount; i++) {
            let division = i + 1;
            let league = leagues.find(ce => ce.championship.division === division);
            let select = HtmlHelper.newSelect(`division${division}`, league.clubs);
            this._element.appendChild(document.createElement('br'));
            this._element.appendChild(select);
        }
    }
}