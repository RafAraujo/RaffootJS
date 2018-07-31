let Championship = (function() {
    let _championships = [];

    return class Championship extends Entity {
        constructor(name, championshipType, country, confederation, division, clubCount) {
            super();

            this.name = name;
            this.championshipType = championshipType;
            this.country = country;
            this.confederation = confederation;
            this.division = division;
            this.clubCount = clubCount;
            
            championshipType.addChampionship(this);
        }
    
        static seed() {
            let championshipTypes = ChampionshipType.all();
    
            let nationalCup = championshipTypes.find(c => c.scope === 'national' && c.format === 'cup');
            let nationalLeague = championshipTypes.find(c => c.scope === 'national' && c.format === 'league');
            let continentalCup = championshipTypes.find(c => c.scope === 'continental' && c.format === 'cup');
            let continentalSuperCup = championshipTypes.find(c => c.scope === 'continental' && c.format === 'superCup');
            let worldwideSuperCup = championshipTypes.find(c => c.scope === 'worldwide' && c.format === 'superCup');
    
            let countries = Country.playable();
    
            for (let i = 0; i < countries.length; i++) {
                let country = countries[i];
    
                _championships.push(new Championship(country.name + ' Cup', nationalCup, country, null, null, country.cupClubCount));
    
                for (let j = 0; j < country.divisionCount; j++) {
                    let division = j + 1;
                    _championships.push(new Championship(country.name + ' League ' + division, nationalLeague, country, null, division, country.leagueClubCount));
                }
            }
    
            let confederations = Confederation.all();
    
            for (let i = 0; i < confederations.length; i++) {
                let confederation = confederations[i];
    
                for (let j = 0; j < confederation.divisionCount; j++) {
                    let division = j + 1;
                    _championships.push(new Championship(confederation.cupName(division), continentalCup, null, confederation, division, confederation.cupClubCount));
                }
                       
                _championships.push(new Championship(confederation.name + ' Super Cup', continentalSuperCup, null, confederation, null, 2));
            }
    
            _championships.push(new Championship('World Cup', worldwideSuperCup, null, null, null, 2));
    
            Object.freeze(_championships);
        }
    
        static all() {
            return _championships;
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
            if (this.country != null)
                return this.country.playableClubs;
            else if (this.confederation != null)
                return this.confederation.playableClubs;
            else
                return Club.playable();
        }
    
        prize(classification) {
            return 0;
        }
    }
})();
