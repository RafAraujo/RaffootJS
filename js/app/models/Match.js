let Match = (function() {
    const pause = 15;

    return class Match {
        constructor (championshipEdition, date) {
            this.championshipEdition = championshipEdition
            this.date = date;
            this._stadium = null;
            this.matchClubs = [];
            this.referee = Referee.all().getRandomItem();

            this.time = 0;
            this.duration = 90;
            this.paused = false;
        }

        addClub(club, situation) {        
            if (club == null || this.matchClubs.length === 2)
                throw new Error('Match.addClub(club, situation)')

            let matchClub = new MatchClub(this, club, situation);
            this.matchClubs.push(matchClub);

            if (this._stadium == null && matchClub.situation === 'home')
                this._stadium = matchClub.club.stadium;
        }

        get stadium() {
            return this._stadium;
        }

        set stadium(value) {
            for (let i = 0; i < this.matchClubs.length; i++) {
                let matchClub = this.matchClubs[i];
                if (matchClub.situation !== 'neutral') throw new Error('Match.setStadium(value)');
            }
            this._stadium = value;
        }

        get homeClub() {
            return this.matchClubs.find(mc => mc.situation === 'home').club;
        }

        get awayClub() {
            return this.matchClubs.find(mc => mc.situation === 'away').club;
        }

        get description() {
            let club1 = this.homeClub || this.matchClubs[0];
            let club2 = this.awayClub || this.matchClubs[1];

            return club1.name + " x " + club2.name;
        }
        
        play() {
            while (this.time++ <= 90 && !this.paused) {
                nextMove();
            }

            this.finished = true;
            this.save();
        }

        nextMove() {
            switch (this.time) {
                case 0:
                    break;
                case this.duration / 2:
                    halfTime();
                    break;
                case this.duration:
                    finish();
                    break;
            }
        }

        halfTime() {
            squads.forEach(s => s.squadPlayers.players.rest(pause));
        }

        finish() {

        }

        pause() {

        }

        save() {

        }
    }
})();