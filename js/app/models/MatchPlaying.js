let MatchPlaying = (function () {
    return class MatchPlaying {
        constructor(match) {
            this._match = match;
            this._time = 0;
            this._stoppageTime = 0;
            this._ballPossessor = this._match.matchClubHome.matchPlayers[0];
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
            this._time++;
        }
    }
})();