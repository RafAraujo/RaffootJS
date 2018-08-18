let ChampionshipEditionClub = (function() {
    let _championshipEditionClubs = [];

    return class ChampionshipEditionClub extends Entity {
        constructor(championshipEditionId, clubId) {
            super();

            this._championshipEditionId = championshipEditionId;
            this._clubId = clubId;

            this.played = 0;
            this.eliminationPhasesWon = 0;
            this.won = 0;
            this.drawn = 0;
            this.lost = 0;
            this.goalsFor = 0;
            this.goalsAgainst = 0;
        }

        static create(championshipEdition, club) {
            let championshipEditionClub = new ChampionshipEditionClub(championshipEdition.id, club.id);
            championshipEditionClub.id = _championshipEditionClubs.push(championshipEditionClub);
            return championshipEditionClub;
        }

        static load(object) {
            return super.updateList(_championshipEditionClubs, Object.assign(new ChampionshipEditionClub(), object));
        }

        static all() {
            return _championshipEditionClubs;
        }

        get championshipEdition() {
            return ChampionshipEdition.all()[this._championshipEditionId - 1];
        }

        get club() {
            return Club.all()[this._clubId - 1];
        }

        get points() {
            return this.won * 3 + this.drawn;
        }

        get goalsDifference() {
            return this.goalsFor - this.goalsAgainst;
        }
    }
})();