let _matchPlayerStats = [];

class MatchPlayerStats {
    constructor(matchPlayer) {
        this.id = _matchPlayerStats.length + 1;
        this.matchPlayer = matchPlayer;

        //Defending scouts
        this.matchWithoutConcedingGoals = true;
        this.penaltySaves = 0; // Only for goalkeepers
        this.saves = 0; // Only for goalkeepers
        this.tacklesWon = 0;
        this.ownGoals = 0;
        this.redCard = false;
        this.yellowCards = 0;
        this.sufferedGoals = 0; // Only for goalkeepers
        this.fouls = 0;

        //Attacking scouts
        this.goals = 0;
        this.assists = 0;
        this.goalPostShots = 0;
        this.defendedShots = 0;
        this.wrongShots = 0;
        this.foulsSuffered = 0;
        this.penaltyMissses = 0;
        this.offsides = 0;
        this.wrongPasses = 0;

        _matchPlayerStats.push(this);
    }

    get rating() {
        let _rating = 0;

        if (this.matchPlayer.squadPlayer.fieldLocalization.position.isGoalkeeper) {
            _rating += this.penaltySaves * 7;
            _rating += this.saves * 3;
            _rating += this.sufferedGoals * -2;
        }

        _rating += this.matchWithoutConcedingGoals * 5;
        _rating += this.tacklesWon * 1.5;
        _rating += this.ownGoals * -5;
        _rating += this.redCard * -5;
        _rating += this.yellowCards * -2;
        _rating += this.fouls * -0.5;

        _rating += this.goals * 8;
        _rating += this.assists * 5;
        _rating += this.goalPostShots * 5;
        _rating += this.defendedShots * 1.2;
        _rating += this.wrongShots * 0.8;
        _rating += this.foulsSuffered * 0.5;
        _rating += this.penaltyMissses * -4;
        _rating += this.offsides * -0.5;
        _rating += this.wrongPasses * -0.3;

        return _rating;
    }
}