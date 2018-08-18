let SquadPlayer = (function() {
    let _squadPlayers = [];

    return class SquadPlayer extends Entity {
        constructor(squadId, playerId) {
            super();

            this._squadId = squadId;
            this._playerId = playerId;
            this.fieldLocalization = null;
        }

        static create(squad, player) {
            let squadPlayer = new SquadPlayer(squad.id, player.id);
            squadPlayer.id = _squadPlayers.push(squadPlayer);
            return squadPlayer;
        }

        static load(object) {
            return super.updateList(_squadPlayers, Object.assign(new SquadPlayer(), object));
        }

        static all() {
            return _squadPlayers;
        }

        get squad() {
            return Squad.all()[this._squadId - 1];
        }

        get player() {
            return Player.all()[this._playerId - 1];
        }
    }
})();