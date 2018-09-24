class NewGameController {
    constructor() {
        this._form = document.getElementById('form');
        this._selectCountry = document.getElementById('country');
        this._selectClub = document.getElementById('club');
        this._inputName = document.getElementById('name');

        this._service = new GameService();
        this._view = new View();

        this._form.addEventListener('submit', this._saveAsync.bind(this));
        this._selectCountry.addEventListener('change', this._setCountry.bind(this));
        this._selectClub.addEventListener('change', this._setClub.bind(this));
    }

    async createGameAsync() {
        try {
            this._game = Game.create();
            this._view = new NewGameView(this._game);
            await this._game.seedAsync();
            this._view.update();
        }
        catch (error) {
            console.log(error);
            this._view.showMessage('Error on creating game', 'danger');
        }
    }

    _setCountry() {
        this._game.country = this._game.countries.find(c => c.id == this._selectCountry.value);
        this._view.update();

    }

    _setClub() {
        this._game.club = this._game.country.clubs.find(c => c.id == this._selectClub.value);
    }

    _setCoach() {
        this._game.coach = Coach.create(null, this._inputName.value);
    }

    _setName() {
        this._game.name = this._inputName.value;
    }

    async _saveAsync(event) {
        event.preventDefault();

        this._setCoach();
        this._setName();

        this._view.showMessage('Starting game...', 'primary');

        try {
            await this._service.createAsync(this._game.name);
            location.href = `home.html?game=${this._game.name}`;
        }
        catch (error) {
            console.log(error);
            this._view.showMessage('Error on saving game', 'danger');
        };
    }
}