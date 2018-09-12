class NewGameView extends View {
    constructor(game) {
        super();

        this._game = game;

        this._form = document.getElementById('form');
        this._selectCountry = document.getElementById('country');
        this._selectClub = document.getElementById('club');
        this._imgFlag = document.getElementById('flag');
        this._aBack = document.getElementById('back');
        this._buttonStart = document.getElementById('start');

        this._country = null;

        HtmlHelper.hide(this._form);
    }

    update() {
        super.update();

        if (this._game.countries.length === 0)
            return;

        if (this._game.name.length === 0)
            this._changed();
        else if (this._game.name.length > 0)
            this._starting();
    }

    _changed() {
        HtmlHelper.show(this._form);

        this._fillCountries();
        this._fillClubs();

        this._country = this._selectCountry.value;
    }

    _starting() {
        this._aBack.disabled = this._buttonStart.disabled = true;
        this.showMessage('Starting...', 'primary');
    }

    _fillCountries() {
        if (this._selectCountry.options.length > 0)
            return;

        HtmlHelper.fillSelect(this._selectCountry, this._game.countries.orderBy('name'));
        this._selectCountry.focus();
    }

    _fillClubs() {
        if (this._game.country == null || this._country == this._selectCountry.value)
            return;

        HtmlHelper.clearSelect(this._selectClub);
        this._selectClub.appendChild(new Option());

        let leagues = this._game.currentSeason.nationalLeagues.filter(ce => ce.championship.country === this._game.country).orderBy('championship.division');

        for (let league of leagues) {
            let optionGroup = document.createElement('optgroup');
            optionGroup.label = `Division ${league.championship.division}`;
            league.clubs.orderBy('name').forEach(c => optionGroup.appendChild(new Option(c.name, c.id)));
            this._selectClub.appendChild(optionGroup);
        }
    }
}