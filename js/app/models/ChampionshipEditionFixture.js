let ChampionshipEditionFixture = (function() {
    let _championshipEditionFixtures = [];

    return class ChampionshipEditionFixture {
        constructor(championshipEdition, number) {
            this.id = _championshipEditionFixtures.length + 1;
            this.championshipEdition = championshipEdition;
            this.number = number;

            _championshipEditionFixtures.push(this);
        }

        get name() {
            return 'Fixture ' + number;
        }
    }
})();