let Squad = (function() {
    let _squads = [];

    return class Squad extends Entity {
        constructor(formationId) {
            super();

            this._formationId = formationId;
            this._squadPlayerIds = [];
            this._freeKickTaker = null;
            this._penaltyTaker = null;
        }

        static create(formation) {
            let squad = new Squad(formation.id);
            squad.id = _squads.push(squad);
            return squad;
        }

        static load(objects) {
            _squads = objects.map(o => Object.assign(new Squad(), o));
        }

        static all() {
            return _squads;
        }

        get formation() {
            return Formation.all()[this._formationId - 1];
        }

        get squadPlayers() {
            return SquadPlayer.all().filterById(this._squadPlayerIds);
        }

        get players() {
            return this.squadPlayers.map(sp => sp.player).orderBy('position.line', 'position.abbreviation', '-overall');
        }

        set freeKickTaker(squadPlayer) {
            this._freeKickTaker = this.findSquadPlayer(squadPlayer);
        }

        get freeKickTaker() {
            return this._freeKickTaker;
        }

        set penaltyTaker(squadPlayer) {
            this._penaltyTaker = this.findSquadPlayer(squadPlayer);
        }

        get penaltyTaker() {
            return this._penaltyTaker;
        }
        
        get overall() {
            return this.squadPlayers.map(sp => sp.player.overall).sum();
        }

        get wage() {
            return this.squadPlayers.map(sp => sp.player.wage).sum();
        }

        add(player) {
            let squadPlayer = SquadPlayer.create(this, player);
            this._squadPlayerIds.push(squadPlayer.id);
        }

        remove(player) {
            let squadPlayer = this.squadPlayers.find(sp => sp.player === player);
            this._squadPlayerIds.remove(squadPlayer);
        }

        findSquadPlayer(squadPlayer) {
            return this.squadPlayers.find(sp => sp.squadPlayer === squadPlayer);
        }

        rest(time) {
            this.squadPlayers.forEach(sp => sp.player.rest(time));
        }
    }
})();