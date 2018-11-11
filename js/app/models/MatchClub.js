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

        get opponent() {
            return this.match.matchClubs.find(mc => mc !== this);
        }

        get overallDefense() {
            return this.fieldRegionOverall(FieldRegion.find('defense'));
        }

        get overallMidfield() {
            return this.fieldRegionOverall(FieldRegion.find('midfield'));
        }

        get overallAttack() {
            return this.fieldRegionOverall(FieldRegion.find('attack'));
        }

        get goals() {
            return this.match.finished ? this._goals : null;
        }

        set goals(value) {
            this._goals = value;
        }

        arrangeTeam() {
            this._matchPlayersIds = [];
            this.club.squad.starting11.forEach(sp => this.addMatchPlayer(sp));
        }

        playersAt(fieldRegion) {
            return this.matchPlayers.filter(mp => mp.fieldLocalization.position.fieldRegion === fieldRegion && !mp.redCard);
        }

        fieldRegionOverall(fieldRegion) {
            return this.playersAt(fieldRegion).map(mp => mp.overall).sum();
        }

        addMatchPlayer(squadPlayer) {
            this._matchPlayersIds.push(MatchPlayer.create(this, squadPlayer).id);
        }

        addGoal() {
            this._goals++;
        }
    }
})();