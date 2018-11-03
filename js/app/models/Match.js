let Match = (function () {
    let _matches = [];

    return class Match extends Entity {
        constructor(championshipEditionId, date, refereeId) {
            super();

            this._championshipEditionId = championshipEditionId;
            this.date = date;
            this._stadiumId = null;
            this._matchClubIds = [];
            this._refereeId = refereeId;
            this.audience = null;
            this.income = null;
            this.finished = false;
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
            this._stadiumId = value.id;
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

            return `${club1.name} x ${club2.name}`;
        }

        get score() {
            if (this.finished)
                return `${this.matchClubHome.goals} x ${this.matchClubAway.goals}`;
            else
                return ' x ';
        }

        get scoreReverse() {
            if (this.finished)
                return `${this.matchClubAway.goals} x ${this.matchClubHome.goals}`;
            else
                return ' x ';
        }

        addClub(club, situation) {
            if (club == null || this._matchClubIds.length === 2)
                throw new Error('Match.addClub(club, situation)')

            let matchClub = MatchClub.create(this, club, situation);
            this._matchClubIds.push(matchClub.id);

            if (!this._stadiumId && matchClub.situation === 'home')
                this._stadiumId = matchClub.club.stadium.id;
        }

        getGoalsByClub(club) {
            return this.matchClubs.find(mc => mc.club === club).goals;
        }

        play() {
            this.audience = Random.number(this.stadium.capacity);
            this.matchClubs.forEach(mc => mc.club.squad.starting11.forEach(sp => mc.addMatchPlayer(sp)));
            this.matchClubs.forEach(mc => mc.matchPlayers.forEach(mp => mp.defineMarker()));
            this.matchPlaying = new MatchPlaying(this);
            this.matchPlaying.play();
        }
    }
})();
