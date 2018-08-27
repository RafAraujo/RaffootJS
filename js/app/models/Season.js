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

        static load(object) {
            return super.updateList(_seasons, Object.assign(new Season(), object));
        }

        static all() {
            return _seasons;
        }

        static current() {
            return Season.all().last();
        }

        get championshipTypes() {
            let championshipTypes = ChampionshipType.all(); 

            if (this.year === FIRST_YEAR)
                return championshipTypes.filter(ct => ct.scope === 'national');
            else if (this.year === FIRST_YEAR + 1)
                return championshipType.filter(ct => ct.scope === 'national' || ct.scope === 'continental');
            else
                return ChampionshipType.all();
        }

        get championshipEditions() {
            let championshipEditions = [];
            this._championshipEditionIds.forEach(ceId => championshipEditions.push(ChampionshipEdition.all()[ceId - 1]));
            return championshipEditions;
        }

        get seasonDates() {
            return SeasonDate.all().filterById(this._seasonDateIds);
        }

        get nationalLeagues() {
            let nationalLeague = ChampionshipType.all().find(ct => ct.scope === 'national' && ct.format === 'league');
            return this.championshipEditions.filter(ce => ce.championship.championshipType === nationalLeague);
        }

        defineChampionshipEditions() {
            let championships = Championship.all().filter(c => this.championshipTypes.includes(c.championshipType));
            championships.forEach(c => this._championshipEditionIds.push(ChampionshipEdition.create(c, this.year).id));
        }

        hasChampionship(championshipType) {
            return this._championshipEditionIds.includes(championshipType.id);
        }

        defineCalendar() {
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

        schedule() {
            this.defineChampionshipEditions();
            this.defineCalendar();

            for (let i = 0; i < this._championshipEditionIds.length; i++) {
                let championshipEdition = ChampionshipEdition.all()[this._championshipEditionIds[i] - 1];
                championshipEdition.defineClubs();
                let dates = this.seasonDates.filter(sd => sd.championshipType === championshipEdition.championship.championshipType).map(sd => sd.date);
                championshipEdition.scheduleMatches(dates);
            }
        }

        _addSeasonDate(date, championshipType) {
            if (this.hasChampionship(championshipType))
                this._seasonDateIds.push(SeasonDate.create(date, championshipType).id);
        }

        _totallyScheduled(championshipType) {
            let scheduledDates = this.seasonDates.filter(sd => sd.championshipType === championshipType).length;
            let neededDates = this.championshipEditions.filter(ce => ce.championship.championshipType === championshipType).map(ce => ce.championship.dateCount).max();
            return scheduledDates === neededDates;
        }

        mainContinentalCup(confederation) {
            return this._championshipEditions.find(c => c.championship.confederation === confederation && c.championship.division === 1);
        }

        get currentSeasonDate() {
            return this.seasonDates[this._currentSeasonDateIndex];
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

        advanceDate() {
            this._currentSeasonDateIndex++;

            let clubs = Club.playable();
            for (let i = 0; i < clubs.length; i++) {
                let club = clubs[i];
                
                club.squad.rest();
                if (this._currentSeasonDateIndex > 0 && this.currentSeasonDate.date.getMonth() > this.previousSeasonDate.date.getMonth()) {
                    club.payWages();
                }
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