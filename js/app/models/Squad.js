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

        static load(object) {
            let squad = new Squad();
            _squads.push(Object.assign(object, squad));
            return squad;
        }

        static all() {
            return _squads;
        }

        get formation() {
            return Formation.all()[this._formationId - 1];
        }

        get squadPlayers() {
            return SquadPlayer.all().filter(sp => this._squadPlayerIds.includes(sp.id));;
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

        findSquadPlayer(squadPlayer) {
            let found = this.squadPlayers.find(p => p.squadPlayer === squadPlayer);
            
            if (found == null)
                throw new ReferenceError('Squad.findSquadPlayer(squadPlayer)');

            return found;
        }
        
        get overall() {
            let sum = this.squadPlayers.map(sp => sp.player.overall).sum();
            return sum / this.squadPlayers.length;
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
            this._updateSquad();
        }

        rest(time) {
            this.squadPlayers.map(sp => sp.player).forEach(p => p.rest(time));
        }
    }
})();