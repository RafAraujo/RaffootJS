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
            let action = this._ballPossessor.chooseAction();

            let result = 0;
            let success = false;

            if (action === 'passing') {
                result = Random.number(this._ballPossessor.overall + this._ballPossessor.matchClub.attack.getRandomItem().overall + this._ballPossessor.marker.overall);
                success = result >= this._ballPossessor.marker.overall;
            }
            else if (action === 'finishing') {
                result = Random.number(this._ballPossessor.overall + this._ballPossessor.marker.overall + this._ballPossessor.matchClub.opponent.defense.getRandomItem().overall + this._ballPossessor.matchClub.opponent.goalkeeper.overall);
                success = result < this._ballPossessor.overall;
            }
            
            let foul = action === 'passing' && result <= this._ballPossessor.overall * 0.5;

            let move = {
                ballPossessor: this._ballPossessor,
                action: action,
                result: result,
                success: success,
                foul: foul,
                yellowCard: foul && !Random.number(3)
            };

            this._ballPossessor = move.success ?
                this._ballPossessor.matchClub.matchPlayers.getRandomItem() : 
                this._ballPossessor.matchClub.opponent.matchPlayers.getRandomItem();

            if (move.action === 'finishing' && move.success)
                this._ballPossessor.matchClub.addGoal();

            if (move.yellowCard)
                this._ballPossessor.marker.addYellowCard();

            return move;
        }
    }
})();