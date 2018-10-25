let Squad = (function () {
    let _squads = [];

    return class Squad extends Entity {
        constructor(formationId) {
            super();

            this._formationId = formationId;
            this._squadPlayerIds = [];
            this.starting = false;
            this._freeKickTakerId = null;
            this._penaltyTakerId = null;
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

        set formation(value) {
            this._formationId = value == null ? null : value.id;
            this.setAutomaticLineUp();
        }

        get squadPlayers() {
            return SquadPlayer.all().filterById(this._squadPlayerIds);
        }

        get players() {
            return this.squadPlayers.map(sp => sp.player);
        }

        get starting11() {
            return this.squadPlayers.filter(sp => sp.fieldLocalization);
        }

        get substitutes() {
            return this.squadPlayers.filter(sp => !sp.fieldLocalization);
        }

        get freeKickTaker() {
            return this.squadPlayers.find(sp => sp.id === this._freeKickTakerId);
        }

        set freeKickTaker(squadPlayer) {
            this._freeKickTakerId = squadPlayer.id;
        }

        get penaltyTaker() {
            return this.squadPlayers.find(sp => sp.id === this._penaltyTakerId);
        }

        set penaltyTaker(squadPlayer) {
            this._penaltyTakerId = squadPlayer.id;
        }

        setSquadPlayerFieldLocalization(squadPlayer, fieldLocalization) {
            let currentSquadPlayer = this.starting11.find(sp => sp.fieldLocalization === fieldLocalization);
            if (currentSquadPlayer)
                this.swapRoles(currentSquadPlayer, squadPlayer);
            else
                squadPlayer.fieldLocalization = fieldLocalization;
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
                    .orderBy('distance', '-overall', '-squadPlayer.player.energy', '-squadPlayer.player.condtiion')[0].squadPlayer;
                    
                squadPlayer.fieldLocalization = fl;
                results = results.filter(r => r.squadPlayer !== squadPlayer);
            });
        }

        swapRoles(squadPlayer1, squadPlayer2) {
            let aux = squadPlayer1.fieldLocalization;
            squadPlayer1.fieldLocalization = squadPlayer2.fieldLocalization;
            squadPlayer2.fieldLocalization = aux;
        }

        getSquadPlayerByName(name) {
            return this.squadPlayers.find(sp => sp.player.name === name);
        }

        rest(time) {
            this.squadPlayers.forEach(sp => sp.player.rest(time));
        }
    }
})();