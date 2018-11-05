let MatchPlaying = (function () {
    return class MatchPlaying {
        constructor(match) {
            this._match = match;
            this._time = 0;
            this._stoppageTime = 0;
            
            this._ballPossessor = this._match.matchClubHome.goalkeeper;
            this._moves = [];
        }

        get _finished() {
            return this._time > 90 + this._stoppageTime;
        }

        play() {
            while (!this._finished) {
                this._moves.push(this._nextMove());
                this._time += 0.5;
            }
            this._match.finished = true;
        }

        _nextMove() {
            let action = this._chooseAction();
            let result = Random.number(this._ballPossessor.overall + this._ballPossessor.marker.overall);
            let foul = action === 'passing' && result <= this._ballPossessor.overall * 0.5;

            let move = {
                ballPossessor: this._ballPossessor,
                action: action,
                result: result,
                success: result <= this._ballPossessor.overall,
                foul: foul,
                yellowCard: foul && !Random.number(3)
            };

            if (success)
                if (action === 'passing')
                    this._ballPossessor = this._ballPossessor.playersAhead.getRandomItem();
                else if (action === 'finishing')
                    this._ballPossessor = this._ballPossessor.matchClub.opponent.goalkeeper;
            else
                if (action === 'passing')
                    this._ballPossessor = this._ballPossessor.marker;
                else if (action === 'finishing')
                    this._ballPossessor = this._ballPossessor.matchClub.opponent.goalkeeper;
            
            if (move.yellowCard)
                this._ballPossessor.marker.addYellowCard();

            return move;
        }

        _chooseAction() {
            let actions = [];

            for (let i = 0; i < 11; i++)
                actions.push(this._ballPossessor.fieldLocalization.line < 11 ? 'passing' : 'finishing');
            
            return actions.getRandomItem();
        }
    }
})();