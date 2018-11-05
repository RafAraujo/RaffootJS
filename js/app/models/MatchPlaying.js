let MatchPlaying = (function () {
    return class MatchPlaying {
        constructor(match) {
            this._match = match;
            this._time = 0;
            this._stoppageTime = 0;
            
            this._ballPossessor = this._match.matchClubHome.matchPlayers[0];
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
            let move = {
                ballPossessor: this._ballPossessor,
                action: this._chooseAction(),
                success: Random.number(this._ballPossessor.overall + this._ballPossessor.marker.overall) <= this._ballPossessor.overall
            };

            if (success)
                if (action === 'passing')
                    this._ballPossessor = this._ballPossessor.matchPlayersAhead.getRandomItem();
                else if (action === 'finishing')
                    this._ballPossessor = this._ballPossessor.matchClub.matchClubOpponent.matchPlayers[0];
            else
                if (action === 'passing')
                    this._ballPossessor = this._ballPossessor.matchPlayerMarker;
                else
                    this._ballPossessor = this._ballPossessor.matchClub.matchClubOpponent.matchPlayers[0];

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