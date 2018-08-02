const firstYear = new Date().getFullYear();

class Game extends Entity {
    constructor() {
        super();

        this.name = '';
        this.country = null;
        this.club = null;
        this.coach = null;
        this.seasons = [];
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
    }

    get countries() {
        return Country.playable();
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
        let year = this.seasons.length === 0 ? firstYear : this.seasons.last().year + 1;
        let season = new Season(year);
        season.schedule();
        this.seasons.push(season);
    }
}