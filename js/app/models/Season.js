let Season = (function() {
    let _seasons = [];

    return class Season extends Entity {
        constructor(year) {
            super();

            this.year = year;
            this._championshipEditionIds = [];
            this._seasonDateIds = [];
            this._currentSeasonDateIndex = 0;
            this.finished = false;
        }

        static create(year) {
            let season = new Season(year);
            season.id = _seasons.push(season);
            return season;
        }

        static load(objects) {
            _seasons = objects.map(o => Object.assign(new Season(), o));
        }

        static all() {
            return _seasons;
        }

        static current() {
            return Season.all().last();
        }

        get championshipTypes() {
            return this.year === FIRST_YEAR ? ChampionshipType.all().filter(ct => ct.scope === 'national') : ChampionshipType.all();
        }

        get championshipEditions() {
            return ChampionshipEdition.all().filterById(this._championshipEditionIds);
        }

        get seasonDates() {
            return SeasonDate.all().filterById(this._seasonDateIds);
        }

        get nationalLeagues() {
            let nationalLeague = ChampionshipType.all().find(ct => ct.scope === 'national' && ct.format === 'league');
            return this.championshipEditions.filter(ce => ce.championship.championshipType === nationalLeague);
        }

        get currentDate() {
            return this.seasonDates[this._currentSeasonDateIndex].date;
        }

        get previousSeasonDate() {
            return this.seasonDates[this._currentSeasonDateIndex - 1];
        }

        get matches() {
            return this.selectMany('championshipEditions.matches');
        }

        get today() {
            return this._currentSeasonDate.date;
        }

        schedule() {
            this._defineChampionshipEditions();
            this._defineCalendar();

            for (let championshipEdition of this.championshipEditions) {
                championshipEdition.defineClubs();
                let dates = this._seasonDatesByChampionshipType(championshipEdition.championship.championshipType).map(sd => sd.date);
                championshipEdition.scheduleMatches(dates);
            }
        }

        hasChampionship(championshipType) {
            return this._championshipEditionIds.includes(championshipType.id);
        }

        mainContinentalCup(confederation) {
            return this._championshipEditions.find(c => c.championship.confederation === confederation && c.championship.division === 1);
        }

        _defineChampionshipEditions() {
            let championships = Championship.all().filter(c => this.championshipTypes.includes(c.championshipType));
            this._championshipEditionIds = championships.map(c => ChampionshipEdition.create(c, this.year)).map(ce => ce.id);
        }

        _defineCalendar() {
            let championshipTypes = this.championshipTypes.slice();

            let continentalSuperCup = ChampionshipType.all().find(c => c.scope === 'continental' && c.format === 'superCup');
            let worldwideSuperCup = ChampionshipType.all().find(c => c.scope === 'worldwide' && c.format === 'superCup');

            let date = Date.firstSunday(1, this.year);
            this._addSeasonDate(date, continentalSuperCup);

            let championshipType = null;
            while ((championshipType = championshipTypes.find(ct => !this._totallyScheduled(ct))) != null) {
            
                date = date.addDays(date.getDay() === 0 ? 3 : 4);
                if (date.getMonth() === 6)
                    continue;
                this._addSeasonDate(date, championshipType);
                championshipTypes.rotate();
            }
            
            date = date.addDays(date.getDay() === 0 ? 3 : 4);
            this._addSeasonDate(date, worldwideSuperCup);
        }

        _addSeasonDate(date, championshipType) {
            if (this.hasChampionship(championshipType))
                this._seasonDateIds.push(SeasonDate.create(date, championshipType).id);
        }

        _seasonDatesByChampionshipType(championshipType) {
            return this.seasonDates.filter(sd => sd.championshipType === championshipType);
        }

        _totallyScheduled(championshipType) {
            let scheduledDates = this.seasonDates.filter(sd => sd.championshipType === championshipType).length;
            let neededDates = this.championshipEditions.filter(ce => ce.championship.championshipType === championshipType).map(ce => ce.championship.dateCount).max();
            return scheduledDates === neededDates;
        }

        advanceDate() {
            this._currentSeasonDateIndex++;

            for (let club of Club.playable()) {           
                club.squad.rest();
                if (this._currentSeasonDateIndex > 0 && this.currentDate.getMonth() > this.previousSeasonDate.date.getMonth())
                    club.payWages();
            }

            this.finished = this._currentSeasonDateIndex === this.seasonDates.length;
        }

        getMatchesByDate(date) {
            return this.matches.filter(m => m.date === date);
        }

        getMatchesByClub(club) {
            return this.matches.filter(m => m.matchClubs.map(mc => mc.club).includes(club));
        }
    }
})();