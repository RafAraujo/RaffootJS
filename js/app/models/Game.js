class Game {
    constructor() {
        this.countries = [];

        this._country = null;
        this._club = null;
        this._coach = null;

        this.seasons = [];

        this.seed();
        this.newSeason();
    }

    seed() {
        let t0 = performance.now();
        Confederation.seed();
        let t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");

        Country.seed();
        this.countries = Country.playable();
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
    }

    static load(name) {
        let game = Database.loadGame(name);

        return game;
    }

    get currentSeason() {
        return this.seasons.last();
    }

    get coach() {
        return this._coach;
    }

    set coach(value) {
        this._coach = value;
    }

    get country() {
        return this._country;
    }

    set country(value) {
        this._country = value;
    }

    get club() {
        return this._club;
    }

    set club(value) {
        this._club = value;
        this._club.coach = this._coach;
    }

    advanceDate() {
        this.currentSeason.advanceDate();
        if (this.currentSeason.finished) {
            this.newSeason();
        }
    }

    newSeason() {
        let year = this.seasons.length === 0 ? new Date().getFullYear() : this.seasons.last().year + 1;
        let season = new Season(year);
        season.schedule();
        this.seasons.push(season);
    }
}