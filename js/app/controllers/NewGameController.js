class NewGameController {
    constructor() {
        this._form = document.getElementById('form');
        this._selectCountries = document.getElementById('countries');
        this._selectClubs = document.getElementById('clubs');
        this._inputName = document.getElementById('name');

        this._service = new GameService();
        this._view = new View();

        this._form.addEventListener('submit', this._save.bind(this));
        this._selectCountries.addEventListener('change', this._setCountry.bind(this));
        this._selectClubs.addEventListener('change', this._setClub.bind(this));
    }

    createGame() {
        this._game = Game.create();
        this._view = new NewGameView(this._game);
        this._game.seed();
        this._view.update();
    }

    _setCountry() {
        this._game.country = this._game.countries.find(c => c.id == this._selectCountries.value);
        this._view.update();
        
    }

    _setClub() {
        this._game.club = this._game.country.clubs.find(c => c.id == this._selectClubs.value);
    }

    _setCoach() {
        this._game.coach = Coach.create(null, this._inputName.value);
    }

    _setName() {
        this._game.name = this._inputName.value;
    }

    _save(event) {
        event.preventDefault();

        this._setCoach();
        this._setName();

        this._view.showMessage('Starting game...', 'primary');

        this._service
            .create(this._game.name)
            .then(() => window.location.href = `home.html?game=${this._game.name}`)
            .catch(error => {
                console.log(error);
                this._view.showMessage('Error on saving game', 'danger');
            });
    }
}