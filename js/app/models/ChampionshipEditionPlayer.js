class ChampionshipEditionPlayer extends Entity {
    constructor(player) {
        super();

        this.player = player;

        this.appearances = 0;
        this.timePlayed = 0;
        this.goals = 0;
        this.assists = 0;
        this.ratings = [];
    }

    static load(object) {
        let player = Player.all().find(p => p.id === object.player.id);
        let championshipEditionPlayer = new ChampionshipEditionPlayer(player);

        championshipEditionPlayer.appearances = object.appearances;
        championshipEditionPlayer.timePlayed = object.timePlayed;
        championshipEditionPlayer.goals = object.goals;
        championshipEditionPlayer.assists = object.assits;
        championshipEditionPlayer.appearances = object.ratings;
    }

    get averageRating() {
        return this.ratings.average();
    }
}