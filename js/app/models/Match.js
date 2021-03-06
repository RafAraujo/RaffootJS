let Match = (function () {
    let _matches = [];

    return class Match extends Entity {
        constructor(championshipEditionId, date) {
            super();

            this._championshipEditionId = championshipEditionId;
            this.date = date;
            this._stadiumId = null;
            this._matchClubIds = [];
            this.audience = null;
            this.finished = false;
        }

        static create(championshipEdition, date) {
            let match = new Match(championshipEdition.id, date);
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
            let matchClub = this.matchClubs.find(mc => mc.situation === 'home');
            return matchClub ? matchClub : this.matchClubs[0];
        }

        get matchClubAway() {
            let matchClub = this.matchClubs.find(mc => mc.situation === 'away');
            return matchClub ? matchClub : this.matchClubs[1];
        }

        get clubs() {
            return this.matchClubs.map(mc => mc.club);
        }

        get description() {
            return `${this.matchClubHome.club.name} x ${this.matchClubAway.club.name}`;
        }

        get income() {
            return this.audience * this.stadium.ticketPrice;
        }

        get score() {
            return this._formattedScore(this.matchClubHome, this.matchClubAway);
        }

        get scoreReverse() {
            return this._formattedScore(this.matchClubAway, this.matchClubHome);
        }

        _formattedScore(matchClub1, matchClub2) {
            return this.finished ? `${matchClub1.goals} x ${matchClub2.goals}` : '';
        }

        addClub(club, situation) {
            let matchClub = MatchClub.create(this, club, situation);
            this._matchClubIds.push(matchClub.id);

            if (this._stadiumId == null && matchClub.situation === 'home')
                this._stadiumId = matchClub.club.stadium.id;
        }

        getGoalsByClub(club) {
            return this.matchClubs.find(mc => mc.club === club).goals;
        }

        prepare() {
            this.audience = Random.number(this.stadium.capacity);
            this.matchClubs.forEach(mc => mc.goals = 0);
            this.matchClubs.forEach(mc => mc.arrangeTeam());
            this.finished = false;
            this.matchPlaying = new MatchPlaying(this);
        }

        play() {
            this.matchPlaying.play();
        }
    }
})();
