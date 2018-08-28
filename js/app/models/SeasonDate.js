let SeasonDate = (function() {
    let _seasonDates = [];

    return class SeasonDate extends Entity {
        constructor(date, championshipTypeId) {
            super();

            this.date = date;
            this._championshipTypeId = championshipTypeId;
        }

        static create(date, championshipType) {
            let seasonDate = new SeasonDate(date, championshipType.id);
            seasonDate.id = _seasonDates.push(seasonDate);
            return seasonDate;
        }

        static load(objects) {
            _seasonDates = objects.map(o => Object.assign(new SeasonDate(), o));
        }

        static all() {
            return _seasonDates;
        }

        get championshipType() {
            return ChampionshipType.all()[this._championshipTypeId - 1];
        }
    }
})();