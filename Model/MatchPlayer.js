class MatchPlayer {
    constructor(match, squadPlayer) {
        this.match = match;
        this.squadPlayer = squadPlayer;
        this.matchPlayerStats = null;
    }

    get overall() {
        return this.squadPlayer.player.overall;
    }

    enterField() {
        this.matchPlayerStats = new MatchPlayerStats(this);
    }
}