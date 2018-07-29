let MatchClubStats = (function() {
    let _matchClubStats = [];

    return class MatchClubStats {
        constructor(matchClub) {
            this.id = _matchClubStats.length + 1;
            this.matchClub = matchClub;
            
            this.goals = 0;
            this.shots = 0;
            this.shotsOnTarget = 0;
            this.ballPosession = 0;
            this.fouls = 0;

            _matchClubStats.push(this);
        }
    }
})();