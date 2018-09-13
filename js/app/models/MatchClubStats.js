let MatchClubStats = (function () {
    let _matchClubStats = [];

    return class MatchClubStats {
        constructor(matchClubId) {
            this._matchClubId = matchClubId;
            this.goals = 0;
            this.shots = 0;
            this.shotsOnTarget = 0;
            this.ballPosession = 0;
            this.fouls = 0;
            this.penaltyShootoutGoals = 0;
        }

        static create(matchClub) {
            let matchClubStats = new MatchClubStats(matchClub.id);
            matchClubStats.id = _matchClubStats.push(matchClubStats);
            return matchClubStats;
        }

        static load(objects) {
            _matchClubStats = objects.map(o => Object.assign(new MatchClubStats(), o));
        }

        static all() {
            return _matchClubStats;
        }

        get matchClub() {
            return MatchClub.all()[this._matchClubId - 1];
        }
    }
})();