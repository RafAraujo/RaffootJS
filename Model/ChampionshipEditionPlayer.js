class ChampionshipEditionPlayer {
    constructor(championshipEdition, player) {
        this.championshipEdition = championshipEdition;
        this.player = player;

        this.appearances = 0;
        this.timePlayed = 0;
        this.goals = 0;
        this.assists = 0;
        this.ratings = [];
    }

    get averageRating() {
        return this.ratings.sum() / this.ratings.length;
    }
}