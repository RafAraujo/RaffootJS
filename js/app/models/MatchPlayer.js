let _matchPlayers = [];

class MatchPlayer {
    constructor(match, squadPlayer) {
        this.id = _matchPlayers.length + 1;
        this.match = match;
        this.squadPlayer = squadPlayer;
        this.matchPlayerStats = null;

        _matchPlayers.push(this);
    }

    get overall() {
        return this.squadPlayer.player.overall;
    }

    enterField() {
        this.matchPlayerStats = new MatchPlayerStats(this);
    }
}