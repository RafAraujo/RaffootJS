let Player = (function() {
    let _players = [];

    return class Player extends Entity {
        constructor(name, surname, countryId, birthYear, positionId, side, overall, star, skillIds, condition, injuryProneness) {
            super();

            this._name = name;
            this._surname = surname;
            this._countryId = countryId;
            this._birthYear = birthYear;
            this._positionId = positionId;
            this.side = side;
            this.overall = overall;
            this.star = star;
            this._skillIds = skillIds;
            this.condition = condition;
            this.injuryProneness = injuryProneness;
            this.energy = 100;
            this._contractIds = [];
        }

        static create(country, birthYear, position) {
            let side = position.fieldLocalizations.getRandomItem().side;
            let name = country.names.getRandomItem();
            let surname = country.surnames.getRandomItem();
            let overall = Random.numberBetween(1, 99);
            let star = overall > 90 ? Random.numberBetween(1, 10) === 10 : false;
            let skillIds = position.skills.getRandomItems(star ? 3 : 2).map(s => s.id);
            let condition = Random.numberBetween(1, 5);
            let injuryProneness = Random.numberBetween(1, 3);

            let player = new Player(name, surname, country.id, birthYear, position.id, side, overall, star, skillIds, condition, injuryProneness);
            player.id = _players.push(player);
            return player;
        }

        static load(objects) {
            _players = objects.map(o => Object.assign(new Player(), o));
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
            return Skill.all().filterById(this._skillIds);
        }

        get skillsDescription() {
            return this.skills.map(s => s.name).join('/');
        }

        get skillsAbbreviatedDescription() {
            return this.skills.map(s => s.abbreviation).join('/');
        }
        
        get idealFieldLocalization() {
			return this.position.fieldLocalizations.find(fl => fl.side === this.side);
		}

        get contracts() {
            return Contract.all().filterById(this._contractIds);
        }

        get club() {
            return this.contracts.filter(c => c.inForce).last().destinationClub;
        }

        get owner() {
            return this.contracts.filter(c => c.inForce && c.type === 'definitive').destinationClub;
        }

        get baseWage() {
            return parseFloat(Math.max(Math.pow(this.overall, 2.125) * (this.star ? 2 : 1), 133).toFixed(2));
        }

        get contracts() {
            return Contract.all().filterById(this._contractIds);
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
