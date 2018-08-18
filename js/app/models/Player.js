let Player = (function() {
    let _players = [];

    return class Player extends Entity {
        constructor(name, surname, countryId, birthYear, positionId, overall, star, skillIds, condition, injuryProneness) {
            super();

            this._name = name;
            this._surname = surname;
            this._countryId = countryId;
            this._birthYear = birthYear;
            this._positionId = positionId;
            this.overall = overall;
            this.star = star;

            this._skillIds = skillIds;
            this._skills = [];
            
            this.condition = condition;
            this.injuryProneness = injuryProneness;
            this.energy = 100;
            
            this._contractIds = [];
        }

        static create(country, birthYear, position) {
            let name = country.names.getRandomItem();
            let surname = country.surnames.getRandomItem();
            let overall = Random.numberBetween(1, 99);
            let star = overall > 90 ? Random.numberBetween(1, 10) === 10 : false;
            let skillIds = position.skills.getRandomItems(this.star ? 3 : 2).map(s => s.id);
            let condition = Random.numberBetween(1, 5);
            let injuryProneness = Random.numberBetween(1, 3);

            let player = new Player(name, surname, country.id, birthYear, position.id, overall, star, skillIds, condition, injuryProneness);
            player.id = _players.push(player);
            return player;
        }

        static load(object) {
            return super.updateList(_players, Object.assign(new Player(), object));
        }

        static all() {
            return _players;
        }

        get country() {
            return Country.all()[this._countryId - 1];
        }

        get position() {
            return Position.all()[this._positionId - 1];
        }

        get age() {
            return Season.current().year - this._birthYear;
        }

        get name() {
            return this._name;
        }

        get completeName() {
            return `${this._name} ${this._surname.toUpperCase()}`;
        }

        get skills() {
            if (_skills.length === 0)
                _skills = Skill.all().filter(s => this._skillIds.some(sId => s.id === sId));
            return _skills;
        }

        get contracts() {
            if (this._contracts.length === 0)
                this._updateContracts();
            return this._contracts;
        }

        get club() {
            return this.contracts.filter(c => c.inForce).last().destinationClub;
        }

        get owner() {
            return this.contracts.filter(c => c.inForce && c.type === 'definitive').destinationClub;
        }

        get baseWage() {
            return this.overall * 115 * (this.star ? 2 : 1);
        }

        get contracts() {
            let contracts = [];
            this._contractIds.forEach(cId => contracts.push(Contract.all()[cId - 1]));
            return contracts;
        }

        get inForceContracts() {
            return this.contracts.filter(c => c.inForce);
        }

        get owner() {
            return this.inForceContracts.find(c => c.type === 'definitive');
        }

        get wage() {
            return this.inForceContracts.last().wage;
        }

        addContract(value) {
            this._contractIds.push(value.id);
        }

        rest(time) {
            this.energy += time > 100 ? 100 : this.energy;
        }
    }
})();