class NewGameController {
    constructor() {
        this._selectCountries = $('#countries');
        this._selectClubs = $('#clubs');
        this._inputName = $('#name');
        this._form = $('#form');

        this._proxy = new Bind(Game.create(), new NewGameView(), 'seed', 'country');
        this._proxy.seed();
        this._service = new GameService();

        this._selectCountries.addEventListener('change', this._setCountry.bind(this), { passive: true } );
        this._selectClubs.addEventListener('change', this._setClub.bind(this), { passive: true } );
        this._form.addEventListener('submit', this._save.bind(this));
    }

    _setCountry() {
        this._proxy.country = this._proxy.countries.find(c => c.id == this._selectCountries.value);
    }

    _setClub() {
        this._proxy.club = this._proxy.country.clubs.find(c => c.id == this._selectClubs.value);
    }

    _setCoach() {
        this._proxy.coach = Coach.create(null, this._inputName.value);
    }

    _setName() {
        this._proxy.name = this._inputName.value;
    }

    _save(event) {
        event.preventDefault();

        this._setCoach();
        this._setName();

        this._service
            .save(this._proxy.name)
            .then(game => window.location.href = `home.html?game=${game.name}`)
            .catch(error => { throw error });
    }
}
