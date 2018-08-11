class ChampionshipEditionFixture extends Entity {
    constructor(number) {
        super();

        this.number = number;
    }

    get name() {
        return 'Fixture ' + number;
    }
}