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
            return this.squadPlayers.map(sp => sp.player).orderBy('line', '-overall');
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
            let sum = this.squadPlayers.map(sp => sp.player.overall).sum();
            return sum / this._squadPlayerIds.length;
        }

        get wage() {
            return this.squadPlayers.map(sp => sp.player).map(p => p.wage).sum();
        }

        add(player) {
            let squadPlayer = SquadPlayer.create(this, player);
            this._squadPlayerIds.push(squadPlayer.id);
        }

        remove(player) {
            let squadPlyaerId = this.squadPlayers.find(sp => sp.player.id === player.id);
            this._squadPlayerIds.remove(spId => spId === squadPlyaerId);
        }

        findSquadPlayer(squadPlayer) {
            let found = this.squadPlayers.find(p => p.squadPlayer === squadPlayer);
            
            if (found == null)
                throw new ReferenceError('Squad.findSquadPlayer(squadPlayer)');

            return found;
        }

        rest(time) {
            this.squadPlayers.map(sp => sp.player).forEach(p => p.rest(time));
        }
    }
})();