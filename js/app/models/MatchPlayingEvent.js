class MatchPlayingEvent {
    constructor(type, matchPlayer) {
        this.type = type;
        this.matchPlayer = matchPlayer;
    }

    get matchClub() {
        return this.matchPlayer.matchClub;
    }

    get description() {
        return `${this.type} of ${this.matchPlayer.player.name}`;
    }
}