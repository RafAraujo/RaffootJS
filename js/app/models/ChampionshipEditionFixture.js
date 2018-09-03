let ChampionshipEditionFixture = (function() {
    let _championshipEditionFixtures = [];

    return class ChampionshipEditionFixture extends Entity {
        constructor(championshipEditionId, number) {
            super();

            this._championshipEditionId = championshipEditionId;
            this.number = number;
        }

        static create(championshipEdition, number) {
            let championshipEditionFixture = new ChampionshipEditionFixture(championshipEdition.id, number);
            championshipEditionFixture.id = _championshipEditionFixtures.push(championshipEditionFixture);
            return championshipEditionFixture;
        }

        static load(objects) {
            _championshipEditionFixtures = objects.map(o => Object.assign(new ChampionshipEditionFixture(), o));
        }

        static all() {
            return _championshipEditionFixtures;
        }

        get championshipEdition() {
            return ChampionshipEdition.all()[this._championshipEditionId - 1];
        }

        get matches() {
        }

        get name() {
            return `Fixture ${number}`;
        }
    }
})();