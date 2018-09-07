let Season = (function () {
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
            if (this.year === FIRST_YEAR)
                return ChampionshipType.all().filter(ct => ct.scope === 'national');
            else if (this.year === FIRST_YEAR + 1)
                return ChampionshipType.all().filter(ct => !(ct.scope === 'continental' && ct.format === 'superCup'));
            else
                return ChampionshipType.all();
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

        get currentSeasonDate() {
            return this.seasonDates[this._currentSeasonDateIndex];
        }

        get previousSeasonDate() {
            return this.seasonDates[this._currentSeasonDateIndex - 1];
        }

        get currentDate() {
            return this.currentSeasonDate.date;
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

            this.championshipEditions.forEach(ce => {
                ce.defineClubs();
                let dates = this._getSeasonDatesByChampionshipType(ce.championship.championshipType).map(sd => sd.date);
                ce.scheduleMatches(dates);
            });
        }

        mainContinentalCup(confederation) {
            return this._championshipEditions.find(c => c.championship.confederation === confederation && c.championship.division === 1);
        }

        _defineChampionshipEditions() {
            this.selectMany('championshipTypes.championships').forEach(c => this._championshipEditionIds.push(ChampionshipEdition.create(c, this.year).id));
        }

        _defineCalendar() {
            let continentalSuperCup = ChampionshipType.all().find(c => c.scope === 'continental' && c.format === 'superCup');
            let worldwideSuperCup = ChampionshipType.all().find(c => c.scope === 'worldwide' && c.format === 'superCup');

            let date = Date.firstSunday(1, this.year);
            this._addSeasonDate(date, continentalSuperCup);

            let championshipTypes = this.championshipTypes.slice();
            let championshipType = null;
            while (championshipType = championshipTypes.find(ct => !this._totallyScheduled(ct))) {

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
            if (this.championshipTypes.includes(championshipType))
                this._seasonDateIds.push(SeasonDate.create(date, championshipType).id);
        }

        _getSeasonDatesByChampionshipType(championshipType) {
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