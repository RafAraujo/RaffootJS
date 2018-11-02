let MatchPlaying = (function () {
    let _defenderActions = [];

    return class MatchPlaying {
        constructor(match) {
            this._match = match;
            this._time = 0;
            this._stoppageTime = 0;
            
            this._attacker = this._match.matchClubHome.matchPlayers[0];
            this._defender = this._match.matchClubHome.matchPlayers.last();
            this._highBall = false;
        }

        get _distanceToGoal() {
            return this._ballPossessor.fieldLocalization.distanceToOpponent(FieldLocalization.goalkeeper());
        }

        get _finished() {
            return this._time > 90 + this._stoppageTime;
        }

        play() {
            while (!this._finished) {
                this._nextMove();
            }
            this._match.finished = true;
        }

        _nextMove() {
            let action = this._attacker.fieldLocalization.position.attackingActions.filter(mpa => mpa.highBall = this._highBall);

            let success = Random.number(this._attacker.overallFor(action))
        }
    }
})();