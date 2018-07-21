let _championshipEditionGroups = [];

class ChampionshipEditionGroup {
    constructor(championshipEdition, number) {
        this.id = _championshipEditionGroups.length + 1;
        this.championshipEdition = championshipEdition;
        this.number = number;
        this.championshipEditionClubs = [];
        this.matches = [];

        _championshipEditionGroups.push(this);
    }

    get name() {
        return 'Group ' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[this.number - 1];
    }

    addClub(championshipEditionClub) {
        if (this.championshipEditionClubs.length === GROUP_CLUB_COUNT)
            throw new Error('ChampionshipEditionGroup.addClub(championshipEditionClub)');

        this.championshipEditionClubs.push(championshipEditionClub);
    }

    table() {
        return this.championshipEditionClubs.orderBy('-points', '-won', '-goalsDifference', '-goalsFor');
    }
}