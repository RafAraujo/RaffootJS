let Squad = (function () {
    let _squads = [];

    return class Squad extends Entity {
        constructor(formationId) {
            super();

            this._formationId = formationId;
            this._squadPlayerIds = [];
            this.starting = false;
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
            return this.squadPlayers.map(sp => sp.player);
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

        starting11() {
            return this.squadPlayers.filter(sp => sp.fieldLocalization);
        }

        substitutes() {
            return this.squadPlayers.filter(sp => sp.substituteIndex);
        }

        setAutomaticLineUp() {
            let results = [];

            this.squadPlayers.forEach(sp => sp.fieldLocalization = null);

            this.formation.fieldLocalizations.forEach(fl => {
                this.squadPlayers.forEach(sp => {
                    results.push({
                        fieldLocalization: fl,
                        squadPlayer: sp,
                        overall: sp.calculateOverallAt(fl),
                        distance: sp.player.idealFieldLocalization.distanceTo(fl)
                    });
                });
            });

            this.formation.fieldLocalizations.forEach(fl => {
                let squadPlayer = results.filter(r => r.fieldLocalization === fl)
                    .orderBy('distance', '-overall', '-squadPlayer.player.energy', '-squadPlayer.player.condtiion')
                    .first().squadPlayer;
                    
                squadPlayer.fieldLocalization = fl;
                results = results.filter(r => r.squadPlayer !== squadPlayer);
            });
        }

        swapRoles(squadPlayer1, squadPlayer2) {
            let auxSubstituteIndex = squadPlayer1.substituteIndex;
            let auxFieldLocalization = squadPlayer1.fieldLocalization;

            squadPlayer1.substituteIndex = squadPlayer2.substituteIndex;
            squadPlayer1.fieldLocalization = squadPlayer2.fieldLocalization;

            squadPlayer2.substituteIndex = auxSubstituteIndex;
            squadPlayer2.fieldLocalization = auxFieldLocalization;
        }

        getSquadPlayerByName(name) {
            return this.squadPlayers.find(sp => sp.player.name === name);
        }

        rest(time) {
            this.squadPlayers.forEach(sp => sp.player.rest(time));
        }
    }
})();