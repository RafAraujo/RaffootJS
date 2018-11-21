let Player = (function () {
    let _players = [];

    const _CATEGORIES = Object.freeze(['Gold', 'Silver', 'Bronze']);
    const _SIDES = Object.freeze(['Left', 'Center', 'Right']);

    return class Player extends Entity {
        constructor(name, surname, countryId, birthYear, positionId, side, overall, star, condition, injuryProneness) {
            super();

            this._name = name;
            this._surname = surname;
            this._countryId = countryId;
            this._birthYear = birthYear;
            this._positionId = positionId;
            this.side = side;
            this.overall = overall;
            this.star = star;
            this.condition = condition;
            this.injuryProneness = injuryProneness;
            this.injuryTreatmentEnd = null;
            this._energy = 100;
            this._contractId = null;
            this.forSale = false;
            this.ratings = [];
        }

        static async createAsync(country, birthYear, position, clubDivision) {
            try {
                let names = await country.getPlayerNamesAsync();

                let side = position.fieldLocalizations.getRandom().side;
                let name = names.getRandom();
                let surname = names.getRandom();
                let overall = Player.randomOverall(clubDivision);
                let star = overall > 90 ? Random.number(2) === 2 : false;
                let condition = Random.numberBetween(1, 5);
                let injuryProneness = Random.numberBetween(1, 3);

                let player = new Player(name, surname, country.id, birthYear, position.id, side, overall, star, condition, injuryProneness);
                player.id = _players.push(player);

                return player;
            }
            catch (error) {
                throw error;
            }
        }

        static load(objects) {
            _players = objects.map(o => Object.assign(new Player(), o));
        }

        static all() {
            return _players;
        }

        static categories() {
            return _CATEGORIES;
        }

        static sides() {
            return _SIDES;
        }

        static randomOverall(clubDivision) {
            let min = (NATIONAL_MAX_DIVISION_COUNT - clubDivision) * 10;
            let max = Random.numberBetween(1, 5) === 5 ? 99 : 89 - (clubDivision - 1) * 10;

            return Random.numberBetween(min, max);
        }

        static getCategory(overall) {
            return overall >= 80 ? 'gold' : overall >= 60 ? 'silver' : 'bronze';
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

        get sideDescription() {
            return _SIDES.find(s => s.substr(0, 1) === this.side);
        }

        get completePosition() {
            return `${this.position.name} ${(this.position.hasMultipleSides ? `(${this.sideDescription})` : '')}`;
        }

        get age() {
            return Season.current().year - this._birthYear;
        }

        get name() {
            return `${this._surname.toUpperCase()}`;
        }

        get completeName() {
            return `${this._name} ${this._surname.toUpperCase()}`;
        }

        get category() {
            return Player.getCategory(this.overall);
        }

        get idealFieldLocalization() {
            return this.position.fieldLocalizations.find(fl => fl.side === this.side);
        }

        get baseWage() {
            return Math.max(Player._calculateBaseWage(this.overall, this.star), Player.minimumWage());
        }

        get energy() {
            return new PlayerEnergy(this._energy);
        }

        get marketValue() {
            return Player._calculateMarketValue(this.overall, this.star, this.age);
        }

        get contract() {
            return Contract.all()[this._contractId - 1];
        }

        set contract(value) {
            this._contractId = value.id;
        }

        get club() {
            return this.contract.club;
        }

        get remainingMonthsOfContract() {
            return Date.monthDiff(Season.current().currentDate, this.currentContract.endDate);
        }

        get wage() {
            return this.contract.wage;
        }

        get injuried() {
            return this.injuryTreatmentEnd > Season.current().currentDate;
        }

        ableToPlay(championshipEdition) {
            // TO-DO
        }
    }
})();