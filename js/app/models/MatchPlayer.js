let MatchPlayer = (function () {
    let _matchPlayers = [];

    return class MatchPlayer extends Entity {
        constructor(matchClubId, squadPlayerId, fieldLocalizationId) {
            super();

            this._matchClubId = matchClubId;
            this._squadPlayerId = squadPlayerId;
            this._fieldLocalizationId = fieldLocalizationId;
            this.marker = null;
            this.rating = 5;
        }

        static create(matchClub, squadPlayer) {
            let matchPlayer = new MatchPlayer(matchClub.id, squadPlayer.id, squadPlayer.fieldLocalization.id);
            matchPlayer.id = _matchPlayers.push(matchPlayer);
            return matchPlayer;
        }

        static load(objects) {
            _matchPlayers = objects.map(o => Object.assign(new MatchPlayer(), o));
        }

        static all() {
            return _matchPlayers;
        }

        get matchClub() {
            return Match.all()[this._matchClubId - 1];
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
        
        defineMarker() {
            let results = [];

            this.matchClub.opponent.outfieldPlayers.forEach(mp => {
                results.push({
                    matchPlayer: mp,
                    distance: mp.fieldLocalization.distanceToOpponent(this.fieldLocalization)
                });
            });

            this.marker = results.orderBy('-distance')[0].matchPlayer;
        }

        get playersAhead() {
            return this.matchClub.matchPlayers.filter(mp => mp.fieldLocalization.line > this.fieldLocalization.line);
        }

        overallForMarking() {
            return this.overall -= this.overall * 0.1 * (this.fieldLocalization.line - 2);
        }

        updateRating(success) {

        }
    }
})();