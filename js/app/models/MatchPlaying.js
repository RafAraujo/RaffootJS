let MatchPlaying = (function () {
    return class MatchPlaying {
        constructor(match) {
            this._match = match;
            this._time = 0;
            
            this._ballPossessor = this._match.matchClubHome.goalkeeper;
            this.moves = [];
        }

        get _ballLocation() {
            return this._ballPossessor.fieldLocalization.position.fieldRegion;
        }

        get _attackingClub() {
            return this._ballPossessor.matchClub;
        }

        get _defendingClub() {
            return this._attackingClub.opponent;
        }

        get _players() {
            return this._attackingClub.matchPlayers.concat(this._defendingClub.matchPlayers).map(mp => mp.player);
        }

        play() {
            while (this._time <= 90) {
                this.moves.push(this._nextMove());
                this._time++;
                if (this._time % 10 === 0)
                    this._energyDrain();
            }
            this._players.forEach(p => p.energy = Math.round(p.energy));
            this._match.finished = true;
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
                let target = this._ballPossessor.playersAhead.length > 0 ? this._ballPossessor.playersAhead.getRandom() : this._attackingClub.playersAt(FieldRegion.find('midfield')).getRandom();
                let marker = this._defendingClub.playersAt(this._ballLocation.inverse).getRandom();

                pro = this._ballPossessor.overall + this._attackingClub.regionOverall(this._ballLocation) + this._ballLocation.name === 'goal' ? this._attackingClub.regionOverall('defense') : 0;
                con = this._defendingClub.regionOverall(marker.fieldLocalization.position.fieldRegion);
                let result = Random.number(pro + con);

                if (move.success = result <= pro) {
                    if (!marker.redCard && result <= this._ballPossessor.overall * 0.1) {
                        marker.addYellowCard();
                        move.event = new MatchPlayingEvent(marker.redCard ? 'red card' : 'yellow card', marker, move.time);
                    }
                    this._ballPossessor = target;
                }
                else {
                    this._ballPossessor = this._defendingClub.playersAt(this._ballLocation.inverse).getRandom();
                }
            }
            else if (action === 'finishing') {
                pro = this._ballPossessor.overall;
                con = this._defendingClub.goalkeeper.overall + this._defendingClub.overallDefense;
                
                if (move.success = Random.number(pro + con) <= pro) {
                    this._ballPossessor.score();
                    move.event = new MatchPlayingEvent('goal', this._ballPossessor, move.time);
                }

                this._ballPossessor = this._defendingClub.goalkeeper;
            }

            return move;
        }

        _energyDrain() {
            this._players.forEach(p => p.energy = Math.max(p.energy - p.age * 0.1, 0));
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