let Game = (function () {
    let _games = [];

    return class Game extends Entity {
        constructor() {
            super();

            this.name = '';
            this._countryId = null;
            this._clubId = null;
            this._coachId = null;
            this._seasonIds = [];
        }

        static create() {
            let game = new Game();
            game.id = _games.push(game);
            return game;
        }

        static load(objects) {
            _games = objects.map(o => Object.assign(new Game(), o));
        }

        static all() {
            return _games;
        }

        static current() {
            return _games.first();
        }

        async seedAsync() {
            try {
                let t0 = performance.now();
                Confederation.seed();
                console.log('Call took ' + (performance.now() - t0) + ' milliseconds.');

                Country.seed();
                console.log('Call took ' + (performance.now() - t0) + ' milliseconds.');

                FieldRegion.seed();
                console.log('Call took ' + (performance.now() - t0) + ' milliseconds.');

                Position.seed();
                console.log('Call took ' + (performance.now() - t0) + ' milliseconds.');

                FieldLocalization.seed();
                console.log('Call took ' + (performance.now() - t0) + ' milliseconds.');

                Formation.seed();
                console.log('Call took ' + (performance.now() - t0) + ' milliseconds.');

                Skill.seed();
                console.log('Call took ' + (performance.now() - t0) + ' milliseconds.');

                await Club.seedAsync();
                console.log('Call took ' + (performance.now() - t0) + ' milliseconds.');

                await Referee.seedAsync();
                console.log('Call took ' + (performance.now() - t0) + ' milliseconds.');

                ChampionshipType.seed();
                console.log('Call took ' + (performance.now() - t0) + ' milliseconds.');

                Championship.seed();
                console.log('Call took ' + (performance.now() - t0) + ' milliseconds.');

                this.newSeason();
                console.log('Call took ' + (performance.now() - t0) + ' milliseconds.');
            }
            catch (error) {
                throw error;
            }
        }

        get country() {
            return Country.all()[this._countryId - 1];
        }

        set country(value) {
            this._countryId = value.id;
        }

        get club() {
            return Club.all()[this._clubId - 1];
        }

        set club(value) {
            this._clubId = value.id;
        }

        get coach() {
            return Coach.all()[this._coachId - 1];
        }

        set coach(value) {
            this._coachId = value.id;
        }

        get countries() {
            return Country.playable();
        }

        get seasons() {
            return Season.all().filterById(this._seasonIds);
        }

        get currentSeason() {
            return this.seasons.last();
        }

        get currentChampionshipEdition() {
            let season = this.currentSeason;
            return season.championshipEditions.find(ce => ce.championship.championshipType === season.currentSeasonDate.championshipType);
        }

        advanceDate() {
            this.currentSeason.advanceDate();
            if (this.currentSeason.finished)
                this.newSeason();
        }

        newSeason() {
            let year = this.seasons.length === 0 ? FIRST_YEAR : this.seasons.last().year + 1;
            let season = Season.create(year);
            season.schedule();
            this._seasonIds.push(season.id);
        }
    }
})();