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

        static minimumWage() {
            return Player._calculateBaseWage(10, false);
        }

        static _calculateBaseWage(overall, star) {
            let factor = 2.125;
            let value = Math.pow(overall, factor);
            value *= star ? 2 : 1;
            return parseFloat(value.toFixed(2));
        }

        static _calculateMarketValue(overall, star, age) {
            let reference = Player._calculateBaseWage(overall, star) * 36;
            let multiplier = 32 - age;
            let factor = 0.05;
            let value = reference + (multiplier * factor * reference);
            return parseFloat(value.toFixed(2));
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

        get category() {
            return this.overall >= 80 ? 'gold' : this.overall >= 60 ? 'silver' : 'bronze';
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
        
        get baseWage() {
            return Math.max(Player._calculateBaseWage(this.overall, this.star), Player.minimumWage());
        }

        get marketValue() {
            return Player._calculateMarketValue(this.overall, this.star, this.age);
        }

        get contracts() {
            return Contract.all().filterById(this._contractIds);
        }

        get inForceContracts() {
            return this.contracts.filter(c => c.inForce);
        }

        get currentContract() {
            return this.inForceContracts.last();
        }

        get club() {
            return this.currentContract.destinationClub;
        }

        get owner() {
            return this.contracts.filter(c => c.inForce && c.type === 'definitive').last().destinationClub;
        }

        get remainingMonthsOfContract() {
            return Date.monthDiff(Season.current().currentDate, this.currentContract.endDate);
        }

        get wage() {
            return this.inForceContracts.last().wage;
        }

        addContract(value) {
            this._contractIds.push(value.id);
        }

        hasSkill(skillName) {
            return this.skillsDescription.includes(skillName);
	}
    }
})();
