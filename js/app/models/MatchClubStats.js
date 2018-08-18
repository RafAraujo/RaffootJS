let MatchClubStats = (function() {
    let _matchClubStats = [];

    return class MatchClubStats extends Entity {
        constructor(matchClubId) {
            super();
            
            this._matchClubId = matchClubId;
            
            this.goals = 0;
            this.shots = 0;
            this.shotsOnTarget = 0;
            this.ballPosession = 0;
            this.fouls = 0;
        }

        static create(matchClub) {
            let matchClubStats = new MatchClubStats(matchClub.id);
            matchClubStats.id = _matchClubStats.push(matchClub);
            return matchClubStats;
        }

        static load(object) {
            return super.updateList(_matchClubStats, Object.assign(new MatchClubStats(), object));
        }

        static all() {
            return _matchClubs;
        }

        get matchClub() {
            return MatchClub.all()[this._matchClubId - 1];
        }
    }
})();