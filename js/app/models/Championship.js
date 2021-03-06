let Championship = (function () {
    let _championships = [];

    return class Championship extends Entity {
        constructor(name, championshipTypeId, countryId, confederationId, division, clubCount) {
            super();

            this.name = name;
            this._championshipTypeId = championshipTypeId;
            this._countryId = countryId;
            this._confederationId = confederationId;
            this.division = division;
            this.clubCount = clubCount;
        }

        static create(name, championshipType, country, confederation, division, clubCount) {
            let countryId = country == null ? null : country.id;
            let confederationId = confederation == null ? null : confederation.id;

            let championship = new Championship(name, championshipType.id, countryId, confederationId, division, clubCount);
            championship.id = _championships.push(championship);

            championshipType.addChampionship(championship);

            return championship;
        }

        static load(objects) {
            _championships = objects.map(o => Object.assign(new Championship(), o));
        }

        static all() {
            return _championships;
        }

        static seed() {
            let nationalCup = ChampionshipType.find('national', 'cup');
            let nationalLeague = ChampionshipType.find('national', 'league');
            let continentalCup = ChampionshipType.find('continental', 'cup');
            let continentalSuperCup = ChampionshipType.find('continental', 'superCup');
            let worldwideSuperCup = ChampionshipType.find('worldwide', 'superCup');

            Country.playable().forEach(country => {
                Championship.create(`${country.name} Cup`, nationalCup, country, null, null, country.cupClubCount);

                for (let j = 0; j < country.divisionCount; j++) {
                    let division = j + 1;
                    Championship.create(`${country.name} League ${division}`, nationalLeague, country, null, division, country.leagueClubCount);
                }
            });

            Confederation.all().forEach(confederation => {
                for (let j = 0; j < confederation.divisionCount; j++) {
                    let division = j + 1;
                    Championship.create(confederation.cupName(division), continentalCup, null, confederation, division, confederation.cupClubCount);
                }
                Championship.create(`${confederation.name} Super Cup`, continentalSuperCup, null, confederation, null, 2);
            });

            Championship.create('World Cup', worldwideSuperCup, null, null, null, 2);

            Object.freeze(_championships);
        }

        static all() {
            return _championships;
        }

        get championshipType() {
            return ChampionshipType.all()[this._championshipTypeId - 1];
        }

        get country() {
            return this._countryId == null ? null : Country.all()[this._countryId - 1];
        }

        get confederation() {
            return this._confederationId == null ? null : Confederation.all()[this._confederationId - 1];
        }

        get importance() {
            switch (this.championshipType.scope) {
                case 'worldwide':
                    return 4;
                case 'continental':
                    return this.division === 1 ? 5 : 3;
                case 'national':
                    return this.championshipType.regulation === 'cup' ? 3 : 5 - this.division;
                default:
                    return 0;
            }
        }

        get twoLeggedTie() {
            return this.championshipType.twoLeggedTie;
        }

        get groupCount() {
            return this.championshipType.regulation === 'groups' ? this.clubCount / GROUP_CLUB_COUNT : 0;
        }

        get groupClubCount() {
            return this.championshipType.regulation === 'groups' ? GROUP_CLUB_COUNT : null;
        }

        get qualifiedClubsByGroupCount() {
            return GROUP_QUALIFIED_CLUB_COUNT;
        }

        get groupDatesCount() {
            return this.championshipType.regulation === 'groups' ? (GROUP_CLUB_COUNT - 1) * (this.twoLeggedTie ? 2 : 1) : 0;
        }

        get eliminationDatesCount() {
            switch (this.championshipType.regulation) {
                case 'groups':
                    return genericEliminationDatesCount(GROUP_CLUB_COUNT * GROUP_QUALIFIED_CLUB_COUNT, this.twoLeggedTie);
                case 'elimination':
                    return genericEliminationDatesCount(this.clubCount, this.twoLeggedTie);
                default:
                    return 0;
            }

            function genericEliminationDatesCount(clubCount, twoLeggedTie) {
                return Math.log2(clubCount) * (twoLeggedTie ? 2 : 1);
            }
        }

        get dateCount() {
            switch (this.championshipType.regulation) {
                case 'groups':
                    return this.groupDatesCount + this.eliminationDatesCount;;
                case 'elimination':
                    return this.eliminationDatesCount;
                case 'round-robin':
                    return (this.clubCount - 1) * (this.twoLeggedTie ? 2 : 1);
                default:
                    return 0;
            }
        }

        get clubsAbleToPlay() {
            if (this._countryId != null)
                return this.country.playableClubs;
            else if (this._confederationId != null)
                return this.confederation.playableClubs;
            else
                return Club.playable();
        }

        prize(classification) {
            return 0;
        }
    }
})();
