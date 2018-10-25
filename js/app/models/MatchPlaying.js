let MatchPlaying = (function () {
    let actions = ['cross', 'dribble', 'finish', 'pass', 'run'];

    return class MatchPlaying {
        constructor(matchClubHome, matchClubAway) {
            this._matchClubHome = matchClubHome;
            this._matchClubAway = matchClubAway;

            this._ballPossessor = this._matchClubHome.matchPlayers[0];
        }

        get match() {
            return this._matchClubHome.match;
        }

        play() {
            let action = actions.getRandomItem();
        }

        _chooseOption() {
            let distanceToGoal = this._ballPossessor.fieldLocalization.distanceToOpponent(FieldLocalization.goalkeeper());
        }
    }
})();