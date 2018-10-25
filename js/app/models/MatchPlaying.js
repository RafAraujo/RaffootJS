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

        prepare() {
            this._matchClubHome.squadPlayers.forEach(sp => this._matchClubHome.addMatchPlayer(sp));
            this._matchClubAway.squadPlayers.forEach(sp => this._matchClubAway.addMatchPlayer(sp));
        }

        play() {
            let action = actions.getRandomItem();
        }

        _chooseOption() {
            let distanceToGoal = this._ballPossessor.fieldLocalization.distanceToOpponent(FieldLocalization.goalkeeper());
        }
    }
})();