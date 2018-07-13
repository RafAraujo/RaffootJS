class ChampionshipEditionGroup {
    constructor(championshipEdition, number) {
        this.championshipEdition = championshipEdition;
        this.number = number;
        this.championshipEditionClubs = [];
        this.matches = [];
    }

    get name() {
        return 'Group ' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[this.number - 1];
    }

    addClub(championshipEditionClub) {
        if (this.championshipEditionClubs.length === GROUP_CLUB_COUNT)
            throw new Error('ChampionshipEditionGroup.addClub(value)');

        this.clubs.push(championshipEditionClub);
    }

    table() {
        return this.championshipEditionClubs.orderBy('-points', '-won', '-goalsDifference', '-goalsFor');
    }
}