let MatchPlayer = (function () {
    let _matchPlayers = [];

    return class MatchPlayer extends Entity {
        constructor(matchClubId, squadPlayerId, fieldLocalizationId) {
            super();

            this._matchClubId = matchClubId;
            this._squadPlayerId = squadPlayerId;
            this._fieldLocalizationId = fieldLocalizationId;
            this.marker = null;
            this.yellowCard = false;
            this.redCard = false;
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
            return MatchClub.all()[this._matchClubId - 1];
        }

        get squadPlayer() {
            return SquadPlayer.all()[this._squadPlayerId - 1];
        }

        get player() {
            return this.squadPlayer.player;
        }

        get fieldLocalization() {
            return FieldLocalization.all()[this._fieldLocalizationId - 1];
        }

        get overall() {
            return this.redCard ? 0 : this.squadPlayer.overall;
        }

        get playersAhead() {
            return this.matchClub.matchPlayers.filter(mp => mp.fieldLocalization.line > this.fieldLocalization.line);
        }

        chooseAction() {
            let result = Random.number(100);

            switch (this.fieldLocalization.position.fieldRegion.name) {
                case 'goal':
                    return 'passing';
                case 'defense':
                    return result > this.fieldLocalization.line * 1 ? 'passing' : 'finishing';
                case 'midfield':
                    return result > this.fieldLocalization.line * 2 ? 'passing' : 'finishing';
                case 'attack':
                    return result > this.fieldLocalization.line * 3 ? 'passing' : 'finishing';
            }
        }

        score() {
            this.matchClub.addGoal();
        }

        addYellowCard() {
            if (this.yellowCard)
                this.redCard = true;
            this.yellowCard = true;
        }
    }
})();