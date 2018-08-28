let MatchClub = (function() {
    let _matchClubs = [];

    return class MatchClub extends Entity {
        constructor(matchId, clubId, situation) {
            super();

            this._matchId = matchId;
            this._clubId = clubId;
            this.situation = situation;
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
    }
})();