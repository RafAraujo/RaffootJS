let _championshipEditionEliminationPhases = [];

class ChampionshipEditionEliminationPhase {
    constructor(championshipEdition, clubCount) {
        this.id = _championshipEditionEliminationPhases.length + 1;
        
        this.championshipEdition = championshipEdition;
        this.clubCount = clubCount;
        this.championshipEditionClubs = [];
        this.matches = [];

        _championshipEditionEliminationPhases.push(this);
    }

    get name() {
        switch (this.clubCount) {
            case 8:
                return 'Quarter-final';
            case 4:
                return 'Semi-final';
            case 2:
                return 'Final';
            default:
                return 'Round of ' + this.clubCount.toString();
        }
    }

    qualify(championshipEditionClubs) {
        if (championshipEditionClubs.length !== this.clubCount)
            throw new Error('ChampionshipEditionGroup.addClub(championshipEditionClubs)');

        this.championshipEditionClubs = championshipEditionClubs;
    }
}