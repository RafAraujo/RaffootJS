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

            let success = this._performAction(action);

            let move = {
                ballPossessor: this._ballPossessor,
                action: action,
                success: success
            };

            this._ballPossessor = move.success ?
                this._ballPossessor.matchClub.matchPlayers.getRandomItem() : 
                this._ballPossessor.matchClub.opponent.goalkeeper;

            if (move.action === 'finishing' && move.success)
                this._ballPossessor.matchClub.addGoal();

            if (move.yellowCard)
                this._ballPossessor.marker.addYellowCard();

            return move;
        }

        _performAction(action) {            
            let pro = 0;
            let con = 0;

            let fieldRegion = this._ballPossessor.fieldLocalization.position.fieldRegion;

            if (action === 'passing') {
                pro = this._ballPossessor.overall + this._ballPossessor.matchClub.playersAt(fieldRegion).map(mp => mp.overall).sum();
                con = this._ballPossessor.matchClub.opponent.playersAt(fieldRegion).getRandomItem().overall;
            }
            else if (action === 'finishing') {
                pro = this._ballPossessor.overall;
                con = this._ballPossessor.matchClub.opponent.goalkeeper.overall + this._ballPossessor.matchClub.opponent.playersAt(FieldRegion.find('defense')).getRandomItems(2).map(mp => mp.overall).sum();
            }

            let success = Random.number(pro + con) <= pro;

            return success;
        }
    }
})();