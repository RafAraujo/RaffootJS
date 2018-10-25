let MatchPlaying = (function () {
    let actions = ['cross', 'dribble', 'finish', 'pass', 'run'];

    return class MatchPlaying {
        constructor(matchClubHome, matchClubAway) {
            this._matchClubHome = matchClubHome;
            this._matchClubAway = matchClubAway;

            this._ballPossessor = this._squadHome.starting11[0];
        }

        get match() {
            return this._matchClubHome.match;
        }

        get _squadHome() {
            return this._matchClubHome.club.squad;
        }

        get _squadAway() {
            return this._matchClubAway.club.squad;
        }

        play() {
            let action = actions.getRandomItem();
        }

        _chooseOption() {
            let distanceToGoal = this._ballPossessor.fieldLocalization.distanceToOpponent(FieldLocalization.goalkeeper());
        }
    }
})();