let MatchPlaying = (function () {
    return class MatchPlaying {
        constructor(match) {
            this._match = match;
            this._time = 0;
            
            this._ballPossessor = this._match.matchClubHome.goalkeeper;
            this.moves = [];
        }

        get _ballLocation() {
            let fieldRegion = this._ballPossessor.fieldLocalization.position.fieldRegion;
            return fieldRegion.name === 'goal' ? FieldRegion.find('defense') : fieldRegion;
        }

        get _finished() {
            return this._time > 90;
        }

        play() {
            while (!this._finished) {
                this.moves.push(this._nextMove());
                this._time += 0.5;
            }
            this._match.finished = true;
        }

        playHalf(number) {
            while (this._time <= number * 45) {
                this.moves.push(this._nextMove());
                this._time++;
            }
            this._match.finished = this._finished;
        }

        _nextMove() {
            let action = this._ballPossessor.chooseAction();

            let move = {
                time: this._time,
                ballPossessor: this._ballPossessor,
                action: action
            };

            let pro = 0, con = 0;

            if (action === 'passing') {                
                let target = this._ballPossessor.playersAhead.length > 0 ? this._ballPossessor.playersAhead.getRandom() : this._ballPossessor.matchClub.playersAt(FieldRegion.find('midfield')).getRandom();
                let marker = this._ballPossessor.matchClub.opponent.playersAt(this._ballLocation.inverse).getRandom();
                let result = Random.number(pro + con);

                pro = this._ballPossessor.overall + this._ballPossessor.matchClub.fieldRegionOverall(this._ballLocation);
                con = this._ballPossessor.matchClub.opponent.fieldRegionOverall(marker.fieldRegion);

                if (move.success = result <= pro) {
                    if (result <= this._ballPossessor.overall * 0.1) {
                        marker.addYellowCard();
                        move.event = new MatchPlayingEvent('yellow card', marker.player);
                    }
                    this._ballPossessor = target;
                }
                else {
                    this._ballPossessor = this._ballPossessor.matchClub.opponent.playersAt(this._ballLocation.inverse).getRandom();
                }
            }
            else if (action === 'finishing') {
                pro = this._ballPossessor.overall;
                con = this._ballPossessor.matchClub.opponent.goalkeeper.overall + this._ballPossessor.matchClub.opponent.overallDefense;
                
                if (move.success = Random.number(pro + con) <= pro) {
                    this._ballPossessor.score();
                    move.event = new MatchPlayingEvent('goal', this._ballPossessor.player);
                }

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
            let moves = this.moves.filter(m => m.action === action && m.ballPossessor.matchClub === matchClub);
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