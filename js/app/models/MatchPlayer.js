class MatchPlayer extends Entity {
    constructor(match, squadPlayer) {
        super();

        this.match = match;
        this.squadPlayer = squadPlayer;
        this.matchPlayerStats = new MatchPlayerStats(this);
    }

    get overall() {
        return this.squadPlayer.player.overall;
    }
}