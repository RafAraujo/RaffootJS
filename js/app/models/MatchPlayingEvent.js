class MatchPlayingEvent {
    constructor(type, matchPlayer, time) {
        this.type = type;
        this.matchPlayer = matchPlayer;
        this.time = time;
    }

    get matchClub() {
        return this.matchPlayer.matchClub;
    }
}