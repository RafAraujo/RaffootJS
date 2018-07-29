let ChampionshipEditionClub = (function() {
    let _championshipEditionClubs = [];

    return class ChampionshipEditionClub {
        constructor(championshipEdition, club) {
            this.id = _championshipEditionClubs.length + 1;
            this.championshipEdition = championshipEdition;
            this.club = club;

            this.played = 0;
            this.eliminationPhasesWon = 0;
            this.won = 0;
            this.drawn = 0;
            this.lost = 0;
            this.goalsFor = 0;
            this.goalsAgainst = 0;

            _championshipEditionClubs.push(this);
        }

        get points() {
            return this.won * 3 + this.drawn;
        }

        get goalsDifference() {
            return this.goalsFor - this.goalsAgainst;
        }

        get position() {
            let table = this.championshipEdition.table();
            return table.indexOf(this) + 1;
        }
    }
})();