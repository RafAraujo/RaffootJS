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
        
        get distanceToIdealFieldLocalization() {
            let x = this.player.idealFieldLocalization.line - this.fieldLocalization.line;
            let y = this.player.idealFieldLocalization.column - this.fieldLocalization.column;

            return Math.hypot(x, y);
	}
		
	get baseOverall() {
	    return this.player.overall;
	}
		
        get overall() {
            if (!this.fieldLocalization)
                return this.baseOverall;

            let factor = this.baseOverall * this.player.hasSkill('Versatility') ? 0.0325 : 0.075;
            let overall = this.baseOverall - (this.baseOverall * factor * this.distanceToIdealFieldLocalization);

            return Math.round(overall);
        }
    }
})();
