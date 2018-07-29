class Game {
    constructor() {
        this.name = '';
        
        this.season = null;
        this.country = null;
        this.club = null;
        this.coach = null;
    }

    static all() {
        return _games;
    }

    seed() {
        let t0 = performance.now();
        Confederation.seed();
        let t1 = performance.now(); console.log("Call took " + (t1 - t0) + " milliseconds.");

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

        this.season = this.newSeason();
    }

    static load(name) {
        let game = Database.loadGame(name);

        return game;
    }

    get countries() {
        return Country.playable();
    }

    get seasons() {
        return Season.all();
    }

    get currentSeason() {
        return this.seasons.last();
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
        return season;
    }
}