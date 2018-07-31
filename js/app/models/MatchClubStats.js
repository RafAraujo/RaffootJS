class MatchClubStats extends Entity {
    constructor(matchClub) {
        super();
        
        this.matchClub = matchClub;
        
        this.goals = 0;
        this.shots = 0;
        this.shotsOnTarget = 0;
        this.ballPosession = 0;
        this.fouls = 0;
    }
}