class ChampionshipEditionFixture {
    constructor(championshipEdition, number) {
        this.championshipEdition = championshipEdition;
        this.number = number;
    }

    get name() {
        return 'Fixture ' + number;
    }
}