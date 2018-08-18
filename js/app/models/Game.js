let Game = (function() {
    let _games = [];

    return class Game extends Entity {
        constructor() {
            super();

            this.name = '';
            
            this._countryId = 0;
            this._clubId = 0;
            this._coachId = 0;

            this._seasonIds = [];
        }

        static create() {
            let game = new Game();
            game.id = _games.push(game);
            return game;
        }

        static load(object) {
            return super.updateList(_games, Object.assign(new Game(), object));
        }

        static all() {
            return _games;
        }

        seed() {
            let t0 = performance.now();
            Confederation.seed();
            let t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");

            CountryLanguage.seed();
            t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");

            Country.seed();
            t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");

            FieldRegion.seed();
            t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");

            Position.seed();
            t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");

            FieldLocalization.seed();
            t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");
            
            Formation.seed();
            t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");

            Skill.seed();
            t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");

            Stadium.seed();
            t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");
            
            Club.seed();
            t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");

            Referee.seed();
            t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");

            ChampionshipType.seed();
            t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");

            Championship.seed();
            t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");

            this.newSeason();
            t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");
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
            return Season.all().filter(s => this._seasonIds.includes(s.id));
        }

        get currentSeason() {
            return this.seasons.last();
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