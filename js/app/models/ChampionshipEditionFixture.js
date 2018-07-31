class ChampionshipEditionFixture extends Entity {
    constructor(championshipEdition, number) {
        super();

        this.championshipEdition = championshipEdition;
        this.number = number;
    }

    get name() {
        return 'Fixture ' + number;
    }
}