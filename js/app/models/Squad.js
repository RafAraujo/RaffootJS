let Squad = (function() {
    let _squads = [];

    return class Squad {
        constructor() {
            this.id = _squads.length + 1;
            this._formation = Formation.all().getRandomItem();
            this.squadPlayers = [];

            this._freeKickTaker = null;
            this._penaltyTaker = null;
            
            _squads.push(this);
        }

        get formation() {
            return this._formation;
        }

        set formation(value) {
            this._formation = value;
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
            let squadPlayer = new SquadPlayer(this, player);
            this.squadPlayers.push(squadPlayer);
        }

        remove(player) {
            this.squadPlayers.remove(player);
        }

        rest(time) {
            this.squadPlayers.map(sp => sp.player).forEach(p => p.rest(time));
        }
    }
})();