let Match = (function () {
    let _matches = [];

    const pause = 15;

    return class Match extends Entity {
        constructor(championshipEditionId, date, refereeId) {
            super();

            this._championshipEditionId = championshipEditionId;
            this.date = date;
            this._stadiumId = 0;
            this._matchClubIds = [];
            this._refereeId = refereeId;
            this.audience = null;
            this.income = null;
            this.time = 0;
        }

        static create(championshipEdition, date) {
            let referee = Referee.all().getRandomItem();

            let match = new Match(championshipEdition.id, date, referee.id);
            match.id = _matches.push(match);

            championshipEdition.addMatch(match);

            return match;
        }

        static load(objects) {
            _matches = objects.map(o => Object.assign(new Match(), o));
        }

        static all() {
            return _matches;
        }

        get championshipEdition() {
            return ChampionshipEdition.all()[this._championshipEditionId - 1];
        }

        get stadium() {
            return Stadium.all()[this._stadiumId - 1];
        }

        set stadium(value) {
            for (let matchClub of this.matchClubs)
                if (matchClub.situation !== 'neutral')
                    throw new Error('Match.setStadium(value)');

            this._stadium = value;
        }

        get matchClubs() {
            return MatchClub.all().filterById(this._matchClubIds);
        }

        get matchClubHome() {
            return this.matchClubs.find(mc => mc.situation === 'home');
        }

        get matchClubAway() {
            return this.matchClubs.find(mc => mc.situation === 'away');
        }

        get clubs() {
            return this.matchClubs.map(mc => mc.club);
        }

        get referee() {
            return Referee.all()[this._refereeId - 1];
        }

        get description() {
            let club1 = this.matchClubHome ? this.matchClubHome.club : this.matchClubs[0].club;
            let club2 = this.matchClubAway ? this.matchClubAway.club : this.matchClubs[1].club;

            return club1.name + " x " + club2.name;
        }

        get score() {
            if (this.finished)
                return `${this.homeClub.matchClubStats.goals} x ${this.awayClub.matchClubStats.goals}`;
            else
                return ' x ';
        }

        get scoreReverse() {
            if (this.finished)
                return `${this.awayClub.matchClubStats.goals} x ${this.homeClub.matchClubStats.goals}`;
            else
                return ' x ';
        }

        get isDecision() {

        }

        addClub(club, situation) {
            if (club == null || this._matchClubIds.length === 2)
                throw new Error('Match.addClub(club, situation)')

            let matchClub = MatchClub.create(this, club, situation);
            this._matchClubIds.push(matchClub.id);

            if (this._stadiumId === 0 && matchClub.situation === 'home')
                this._stadiumId = matchClub.club.stadium.id;
        }

        getGoalsByClub(club) {
            return this.matchClubs.find(mc => mc.club === club).matchClubStats.goals;
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
