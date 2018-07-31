class ChampionshipEditionClub extends Entity {
    constructor(championshipEdition, club) {
        super();

        this.championshipEdition = championshipEdition;
        this.club = club;

        this.played = 0;
        this.eliminationPhasesWon = 0;
        this.won = 0;
        this.drawn = 0;
        this.lost = 0;
        this.goalsFor = 0;
        this.goalsAgainst = 0;
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