let _squadPlayers = [];

class SquadPlayer {
    constructor(squad, player) {
        this.id = _squadPlayers.length + 1;
        this.squad = squad;
        this.player = player;
        this.fieldLocalization = null;

        _squadPlayers.push(this);
    }
}