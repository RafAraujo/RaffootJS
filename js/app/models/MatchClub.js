let MatchClub = (function () {
    let _matchClubs = [];

    return class MatchClub extends Entity {
        constructor(matchId, clubId, situation) {
            super();

            this._matchId = matchId;
            this._clubId = clubId;
            this.situation = situation;
            this._goals = 0;
            this._matchPlayersIds = [];
        }

        static create(match, club, situation) {
            let matchClub = new MatchClub(match.id, club.id, situation);
            matchClub.id = _matchClubs.push(matchClub);

            return matchClub;
        }

        static load(objects) {
            _matchClubs = objects.map(o => Object.assign(new MatchClub(), o));
        }

        static all() {
            return _matchClubs;
        }

        get match() {
            return Match.all()[this._matchId - 1];
        }

        get club() {
            return Club.all()[this._clubId - 1];
        }

        get matchPlayers() {
            return MatchPlayer.all().filterById(this._matchPlayersIds);
        }

        get goalkeeper() {
            return this.matchPlayers.find(mp => mp.fieldLocalization.position.isGoalkeeper);
        }

        get outfieldPlayers() {
            return this.matchPlayers.filter(mp => !mp.fieldLocalization.position.isGoalkeeper);
        }

        get defense() {
            return this.matchPlayers.filter(mp => mp.fieldLocalization.line <= 6);
        }

        get attack() {
            return this.matchPlayers.filter(mp => mp.fieldLocalization.line > 6);
        }

        get opponent() {
            return this.match.matchClubs.find(mc => mc !== this);
        }

        get goals() {
            return this.match.finished ? this._goals : null;
        }

        addMatchPlayer(squadPlayer) {
            this._matchPlayersIds.push(MatchPlayer.create(this, squadPlayer).id);
        }

        addGoal() {
            this._goals++;
        }
    }
})();