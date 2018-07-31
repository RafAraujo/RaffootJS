class ChampionshipEditionPlayer extends Entity {
    constructor(championshipEdition, player) {
        super();

        this.championshipEdition = championshipEdition;
        this.player = player;

        this.appearances = 0;
        this.timePlayed = 0;
        this.goals = 0;
        this.assists = 0;
        this.ratings = [];
    }

    get averageRating() {
        return this.ratings.average();
    }
}