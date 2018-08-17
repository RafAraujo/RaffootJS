let MatchPlayer = (function() {
    let _matchPlayers = [];

    return class MatchPlayer extends Entity {
        constructor(matchId, squadPlayerId) {
            super();

            this._matchId = matchId;
            this._squadPlayerId = squadPlayerId;

            this._matchPlayerStatIds = [];
        }

        static create(match, squadPlayer) {
            let matchPlayer = new MatchPlayer(match.id, squadPlayer.id);
            matchPlayer.id = _matchPlayers.push(matchPlayer);
            return matchPlayer;
        }

        static load(object) {
            let matchPlayer = new MatchPlayer();
            _matchPlayers.push(Object.assign(object, matchPlayer));
            return matchPlayer;
        }

        static all() {
            return _matchPlayers;
        }

        get match() {
            return Match.all()[this._matchId - 1];
        }

        get squadPlayer() {
            return SquadPlayer.all()[this._squadPlayerId - 1];
        }

        get overall() {
            return this.squadPlayer.player.overall;
        }
    }
})();