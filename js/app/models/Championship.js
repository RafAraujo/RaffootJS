let Championship = (function() {
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
            return championship;
        }

        static load(objects) {
            _championships = objects.map(o => Object.assign(new Championship(), o));
        }

        static all() {
            return _championships;
        }
    
        static seed() {
            let championshipTypes = ChampionshipType.all();
    
            let nationalCup = championshipTypes.find(ct => ct.scope === 'national' && ct.format === 'cup');
            let nationalLeague = championshipTypes.find(ct => ct.scope === 'national' && ct.format === 'league');
            let continentalCup = championshipTypes.find(ct => ct.scope === 'continental' && ct.format === 'cup');
            let continentalSuperCup = championshipTypes.find(ct => ct.scope === 'continental' && ct.format === 'superCup');
            let worldwideSuperCup = championshipTypes.find(ct => ct.scope === 'worldwide' && ct.format === 'superCup');

            for (let country of Country.playable()) {
                Championship.create(country.name + ' Cup', nationalCup, country, null, null, country.cupClubCount);
    
                for (let j = 0; j < country.divisionCount; j++) {
                    let division = j + 1;
                    Championship.create(country.name + ' League ' + division, nationalLeague, country, null, division, country.leagueClubCount);
                }
            }
    
            for (let confederation of Confederation.all()) {    
                for (let j = 0; j < confederation.divisionCount; j++) {
                    let division = j + 1;
                    Championship.create(confederation.cupName(division), continentalCup, null, confederation, division, confederation.cupClubCount);
                }
                       
                Championship.create(confederation.name + ' Super Cup', continentalSuperCup, null, confederation, null, 2);
            }
    
            Championship.create('World Cup', worldwideSuperCup, null, null, null, 2);

            Object.freeze(_championships);
        }
    
        static all() {
            return _championships;
        }

        get championshipType() {
            return ChampionshipType.all().find(ct => ct.id === this._championshipTypeId);
        }

        get country() {
            return this._countryId == null ? null : Country.all()[this._countryId - 1];
        }

        get confederation() {
            return this._confederationId == null ? null : Confederation.all()[this._confederationId - 1];
        }
    
        get regulation() {
            return this.championshipType.regulation;
        }
    
        get twoLeggedTie() {
            return this.championshipType.twoLeggedTie;
        }
    
        get groupCount() {
            return this.regulation === 'groups' ? this.clubCount / GROUP_CLUB_COUNT : 0;
        }
    
        get groupClubCount() {
            return this.regulation === 'groups' ? GROUP_CLUB_COUNT : null;
        }
    
        get qualifiedClubsByGroupCount() {
            return GROUP_QUALIFIED_CLUB_COUNT;
        }
    
        get groupDatesCount() {
            return this.regulation === 'groups' ? (GROUP_CLUB_COUNT - 1) * (this.twoLeggedTie ? 2 : 1) : 0;
        }
    
        get eliminationDatesCount() {
            switch (this.regulation) {
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
            switch (this.regulation) {
                case 'groups':
                    return  this.groupDatesCount + this.eliminationDatesCount;;
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
