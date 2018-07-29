let _championshipEditionPlayers = [];

class ChampionshipEditionPlayer {
    constructor(championshipEdition, player) {
        this.id = _championshipEditionPlayers.length + 1;
        this.championshipEdition = championshipEdition;
        this.player = player;

        this.appearances = 0;
        this.timePlayed = 0;
        this.goals = 0;
        this.assists = 0;
        this.ratings = [];

        _championshipEditionPlayers.push(this);
    }

    get averageRating() {
        return this.ratings.average();
    }
}