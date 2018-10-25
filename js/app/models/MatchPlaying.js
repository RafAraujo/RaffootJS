let MatchPlaying = (function () {
    let options = ['cross', 'dribble', 'finish', 'pass', 'run'];

    return class MatchPlaying {
        constructor(matchClubHome, matchClubAway) {
            this._matchClubHome = matchClubHome;
            this._matchClubAway = matchClubAway;

            this._ballPossessor = this._squadHome.starting11[0];
        }

        get _squadHome() {
            return this._matchClubHome.club.squad;
        }

        get _squadAway() {
            return this._matchClubAway.club.squad;
        }

        play() {
            let option = options.getRandomItem();
        }

        _chooseOption() {
            let distanceToGoal = this._ballPossessor.fieldLocalization.distanceToOpponent(FieldLocalization.goalkeeper());
        }
    }
})();