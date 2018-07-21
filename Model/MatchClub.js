let _matchClubs = [];

class MatchClub {
    constructor(match, club, situation) {
        this.id = _matchClubs.length + 1;
        this.match = match;
        this.club = club;
        this.situation = situation;

        _matchClubs.push(this);
    }
}