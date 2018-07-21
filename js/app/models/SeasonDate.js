let _seasonDates = [];

class SeasonDate {
    constructor(season, date, championshipType) {
        this.id = _seasonDates.length + 1;
        this.season = season;
        this.date = date;
        this.championshipType = championshipType;

        _seasonDates.push(this);
    }
}