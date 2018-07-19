let _seasons = [];

class Season {
    constructor(year) {
        this.year = year;
        this._championshipEditions = [];
        this.seasonDates = [];
        this.currentSeasonDateIndex = 0;
        this.finished = false;

        _seasons.push(this);

        this.defineChampionshipEditions();
        this.defineCalendar();
    }

    static all() {
        return _seasons;
    }

    static first() {
        return _seasons.first();
    }

    static current() {
        return _seasons.last();
    }

    previous() {
        return this === Season.first() ? null : _seasons[_seasons.length - 2];
    }

    get championshipTypes() {
        let championshipTypes = ChampionshipType.all(); 

        if (this === Season.first())
            return championshipTypes.filter(c => c.scope === 'national');
        else if (this === _seasons[1])
            return championshipType.filter(c => c.scope === 'national' || c.scope === 'continental');
        else
            return ChampionshipType.all();
    }

    get championshipEditions() {
        return this._championshipEditions;
    }

    defineChampionshipEditions() {
        let championships = Championship.all().filter(c => this.championshipTypes.includes(c.championshipType));
        championships.forEach(c => this._championshipEditions.push(new ChampionshipEdition(c, this.year)));
    }

    hasChampionship(championshipType) {
        return this._championshipEditions.some(ce => ce.championship.championshipType === championshipType);
    }

    defineCalendar() {
        let championshipTypes = this.championshipTypes.slice();

        let continentalSuperCup = ChampionshipType.all().find(c => c.scope === 'continental' && c.format === 'superCup');
        let worldwideSuperCup = ChampionshipType.all().find(c => c.scope === 'worldwide' && c.format === 'superCup');

        let date = Date.firstSunday(1, this.year);
        this.addSeasonDate(date, continentalSuperCup);

        let championshipType = null;
        while ((championshipType = championshipTypes.find(ct => !this.totallyScheduled(ct))) != null) {
            date = date.addDays(date.getDay() === 0 ? 3 : 4);
            if (date.getMonth() === 6) continue;
            this.addSeasonDate(date, championshipType);
            championshipTypes.rotate();
        }
        
        date = date.addDays(date.getDay() === 0 ? 3 : 4);
        this.addSeasonDate(date, worldwideSuperCup);
    }

    totallyScheduled(championshipType) {
        let scheduledDates = this.seasonDates.filter(sd => sd.championshipType === championshipType).length;
        let neededDates = this._championshipEditions.filter(ce => ce.championship.championshipType === championshipType).map(ce => ce.championship.dateCount).max();
        return scheduledDates === neededDates;
    }

    addSeasonDate(date, championshipType) {
        if (this.hasChampionship(championshipType))
            this.seasonDates.push(new SeasonDate(this, date, championshipType));
    }

    schedule() {
        for (let i = 0; i < this._championshipEditions.length; i++) {
            let championshipEdition = this._championshipEditions[i];
            championshipEdition.defineClubs();
            let dates = this.seasonDates.filter(sd => sd.championshipType === championshipEdition.championship.championshipType).map(sd => sd.date);
            championshipEdition.scheduleMatches(dates);
        }
    }

    mainContinentalCup(confederation) {
        return this._championshipEditions.find(c => c.championship.confederation === confederation && c.championship.division === 1);
    }

    get currentSeasonDate() {
        return this.seasonDates[this.currentSeasonDateIndex];
    }

    get previousSeasonDate() {
        return this.seasonDates[this.currentSeasonDateIndex - 1];
    }

    get today() {
        return this.currentSeasonDate.date;
    }

    advanceDate() {
        this.currentSeasonDateIndex++;

        let clubs = Club.playable();
        for (let i = 0; i < clubs.length; i++) {
            let club = clubs[i];
            
            club.squad.rest();
            if (this.currentSeasonDateIndex > 0 && this.currentSeasonDate.date.getMonth() > this.previousSeasonDate.date.getMonth()) {
                club.payWages();
            }
        }

        this.finished = this.currentSeasonDateIndex === this.seasonDates.length;
    }

    getMatches(date) {
        return this.selectMany('championshipEditions.matches').filter(m => m.date === date);
    }
}