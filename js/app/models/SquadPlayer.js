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

        get baseOverall() {
            return this.player.overall;
        }

        get overall() {
            return this.fieldLocalization ? this.calculateOverallAt(this.fieldLocalization) : this.baseOverall;
        }

        get category() {
            return Player.getCategory(this.overall);
        }

        calculateOverallAt(fieldLocalization) {
            let factor = this.baseOverall * this.player.hasSkill('Versatility') ? 0.05 : 0.1;
            let overall = this.baseOverall - (this.baseOverall * factor * this.player.idealFieldLocalization.distanceTo(fieldLocalization));

            return Math.round(overall);
        }
    }
})();
