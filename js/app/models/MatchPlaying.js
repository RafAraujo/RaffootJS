let MatchPlaying = (function () {
    return class MatchPlaying {
        constructor(match) {
            this._match = match;
            this._time = 0;
            this._stoppageTime = 0;
            
            this._ballPossessor = this._match.matchClubHome.matchPlayers[0];
            this._highBall = false;
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
            let action = this._highBall ?
            let target = null;
            let distance = null;

            if (action.name === 'Crossing' || action.name === 'Passing') {
                target = this._ballPossessor.matchPlayersAhead.getRandomItem();
                distance = this.fieldLocalization.distanceTo(target.fieldLocalization);
            }
            else if (action.name === 'Heading' || action.name === 'Finishing') {
                target = 'goal';
                distance = this.fieldLocalization.distanceToOpponent(FieldLocalization.goalkeeper());
            }

            let success = Random.number(this._ballPossessor.overallFor(action, distance) + this._ballPossessor.marker.overallForMarking()) <= this._ballPossessor.overall;
        }
    }
})();