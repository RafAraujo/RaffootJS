let MatchPlaying = (function () {
    return class MatchPlaying {
        constructor(match) {
            this._match = match;
            this._time = 0;
            this._stoppageTime = 0;
            
            this._ballPossessor = this._match.matchClubHome.goalkeeper;
            this._moves = [];
        }

        get _ballLocation() {
            let fieldRegion = this._ballPossessor.fieldLocalization.position.fieldRegion;
            return fieldRegion.name === 'goal' ? FieldRegion.find('defense') : fieldRegion;
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

            let move = {
                ballPossessor: this._ballPossessor,
                action: action
            };

            let pro = 0, con = 0;

            if (action === 'passing') {
                pro = this._ballPossessor.overall + this._ballPossessor.matchClub.fieldRegionOverall(this._ballLocation);
                con = this._ballPossessor.matchClub.opponent.fieldRegionOverall(this._ballLocation.inverse);
                
                if (move.success = Random.number(pro + con) <= pro)
                    this._ballPossessor = this._ballPossessor.playersAhead.length > 0 ? this._ballPossessor.playersAhead.getRandomItem() : this._ballPossessor.matchClub.matchPlayers.getRandomItem();
                else
                    this._ballPossessor = this._ballPossessor.matchClub.opponent.playersAt(this._ballLocation.inverse).getRandomItem();
            }
            else if (action === 'finishing') {
                pro = this._ballPossessor.overall;
                con = this._ballPossessor.matchClub.opponent.goalkeeper.overall + this._ballPossessor.matchClub.opponent.overallDefense;
                
                if (move.success = Random.number(pro + con) <= pro)
                    this._ballPossessor.score();

                this._ballPossessor = this._ballPossessor.matchClub.opponent.goalkeeper;
            }

            return move;
        }

        clubsAnalysis() {
            return {
                'goal': `${this._match.matchClubHome.goalkeeper.overall} x ${this._match.matchClubAway.goalkeeper.overall}`,
                'defense': `${this._match.matchClubHome.overallDefense} x ${this._match.matchClubAway.overallDefense}`,
                'midfield': `${this._match.matchClubHome.overallMidfield} x ${this._match.matchClubAway.overallMidfield}`,
                'attack': `${this._match.matchClubHome.overallAttack} x ${this._match.matchClubAway.overallAttack}`,
            }
        }

        _getMoves(action, matchClub, onlySuccessful) {
            let moves = this._moves.filter(m => m.action === action && m.ballPossessor.matchClub === matchClub);
            return onlySuccessful ? moves.filter(m => m.success) : moves;
        }

        stats() {
            return {
                passes: `${this._getMoves('passing', this._match.matchClubHome, false).length} (${this._getMoves('passing', this._match.matchClubHome, true).length}) x ${this._getMoves('passing', this._match.matchClubAway, false).length} (${this._getMoves('passing', this._match.matchClubAway, true).length})`,
                finishes: `${this._getMoves('finishing', this._match.matchClubHome, false).length} (${this._getMoves('finishing', this._match.matchClubHome, true).length}) x ${this._getMoves('finishing', this._match.matchClubAway, false).length} (${this._getMoves('finishing', this._match.matchClubAway, true).length})`,
            }
        }
    }
})();