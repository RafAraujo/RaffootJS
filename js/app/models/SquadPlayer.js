let SquadPlayer = (function () {
    let _squadPlayers = [];

    return class SquadPlayer extends Entity {
        constructor(squadId, playerId) {
            super();

            this._squadId = squadId;
            this._playerId = playerId;
            this._fieldLocalizationId = null;
            this.substituteIndex = null;
        }

        static create(squad, player) {
            let squadPlayer = new SquadPlayer(squad.id, player.id);
            squadPlayer.id = _squadPlayers.push(squadPlayer);
            return squadPlayer;
        }

        static load(objects) {
            _squadPlayers = objects.map(o => Object.assign(new SquadPlayer(), o));
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

        get fieldLocalization() {
            return this._fieldLocalizationId ? FieldLocalization.all()[this._fieldLocalizationId - 1] : null;
        }

        set fieldLocalization(value) {
            this._fieldLocalizationId = value ? value.id : null;
        }

        get improvised() {
            return this._fieldLocalizationId !== this.player.idealFieldLocalization.id;
        }

        get overall() {
            return this.fieldLocalization ? this.calculateOverallAt(this.fieldLocalization) : this.player.overall;
        }

        get category() {
            return Player.getCategory(this.overall);
        }

        calculateOverallAt(fieldLocalization) {
            let overall = this.player.overall - (this.player.idealFieldLocalization.distanceTo(fieldLocalization) * 2);

            return Math.round(overall);
        }
    }
})();
