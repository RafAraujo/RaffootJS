let ChampionshipEditionPlayer = (function() {
    let _championshipEditionPlayers = [];

    return class ChampionshipEditionPlayer extends Entity {
        constructor(championshipEditionId, playerId) {
            super();

            this._championshipEditionId = championshipEditionId;
            this.playerId = playerId;
            this.appearances = 0;
            this.timePlayed = 0;
            this.goals = 0;
            this.assists = 0;
            this.ratings = [];
        }

        static create(player) {
            let championshipEditionPlayer = new ChampionshipEditionPlayer(player.id);
            championshipEditionPlayer.id = _championshipEditionPlayers.push(championshipEditionPlayer);
            return championshipEditionPlayer;
        }

        static load(object) {
            return super.updateList(_championshipEditionPlayers, Object.assign(new championshipEditionPlayer(), object));
        }

        static all() {
            return _championshipEditionPlayers;
        }

        get championshipEdition() {
            return ChampionshipEdition.all()[this._championshipEditionId - 1];
        }

        get player() {
            return Player.all()[this.playerId - 1];
        }

        get averageRating() {
            return this.ratings.average();
        }
    }
})();