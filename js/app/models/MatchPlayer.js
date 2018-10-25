let MatchPlayer = (function () {
    let _matchPlayers = [];

    return class MatchPlayer extends Entity {
        constructor(matchId, squadPlayerId, fieldLocalizationId) {
            super();

            this._matchId = matchId;
            this._squadPlayerId = squadPlayerId;
            this._fieldLocalizationId = fieldLocalizationId;
            this._matchPlayerStatsIds = [];
        }

        static create(match, squadPlayer) {
            let matchPlayer = new MatchPlayer(match.id, squadPlayer.id, squadPlayer.fieldLocalization.id);
            matchPlayer.id = _matchPlayers.push(matchPlayer);
            return matchPlayer;
        }

        static load(objects) {
            _matchPlayers = objects.map(o => Object.assign(new MatchPlayer(), o));
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

        get fieldLocalization() {
            return FieldLocalization.all()[this._fieldLocalizationId - 1];
        }

        get overall() {
            return this.squadPlayer.overall;
        }
        
        get matchPlayerStats() {
            return MatchPlayerStats.all().filterById(this._matchPlayerStatsIds);
        }
    }
})();