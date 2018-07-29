class MatchPlayer {
    constructor(match, squadPlayer) {
        this.id = _matchPlayers.length + 1;
        this.match = match;
        this.squadPlayer = squadPlayer;
        this.matchPlayerStats = new MatchPlayerStats(this);
    }

    get overall() {
        return this.squadPlayer.player.overall;
    }
}