let MatchClub = (function () {
    let _matchClubs = [];

    return class MatchClub extends Entity {
        constructor(matchId, clubId, situation) {
            super();

            this._matchId = matchId;
            this._clubId = clubId;
            this.situation = situation;
            this._goals = null;
            this.matchPlayers = [];
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

        get goalkeeper() {
            return this.matchPlayers.find(mp => mp.fieldLocalization.position.isGoalkeeper);
        }

        get opponent() {
            return this.match.matchClubs.find(mc => mc !== this);
        }

        get overallDefense() {
            return this.regionOverall(FieldRegion.find('defense'));
        }

        get overallMidfield() {
            return this.regionOverall(FieldRegion.find('midfield'));
        }

        get overallAttack() {
            return this.regionOverall(FieldRegion.find('attack'));
        }

        get goals() {
            return this._goals;
        }

        set goals(value) {
            this._goals = value;
        }

        arrangeTeam() {
            this.matchPlayers = [];
            this.club.squad.starting11.forEach(sp => this.addMatchPlayer(sp));
        }

        playersAt(fieldRegion) {
            return this.matchPlayers.filter(mp => mp.fieldLocalization.position.fieldRegion === fieldRegion);
        }

        addMatchPlayer(squadPlayer) {
            this.matchPlayers.push(new MatchPlayer(this, squadPlayer));
        }

        regionOverall(fieldRegion) {
            return this.playersAt(fieldRegion).map(mp => mp.overall).sum();
        }

        addGoal() {
            this._goals++;
        }
    }
})();