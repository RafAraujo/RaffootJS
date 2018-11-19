
let ChampionshipEditionGroup = (function () {
    let _championshipEditionGroups = [];

    return class ChampionshipEditionGroup extends Entity {
        constructor(championshipEditionId, number) {
            super();

            this._championshipEditionId = championshipEditionId;
            this.number = number;
            this._championshipEditionClubIds = [];
            this._matchIds = [];
        }

        static create(championshipEdition, number) {
            let championshipEditionGroup = new ChampionshipEditionGroup(championshipEdition.id, number);
            championshipEditionGroup.id = _championshipEditionGroups.push(championshipEditionGroup);
            return championshipEditionGroup;
        }

        static load(objects) {
            _championshipEditionGroups = objects.map(o => Object.assign(new ChampionshipEditionGroup(), o));
        }

        static all() {
            return _championshipEditionGroups;
        }

        get championshipEditionClubs() {
            return ChampionshipEditionClub.all().filterById(this._championshipEditionClubIds);
        }

        get name() {
            return `Group ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[this.number - 1]}`;
        }

        get championshipEdition() {
            return ChampionshipEdition.all()[this._championshipEditionId - 1];
        }

        get matches() {
            return this.championshipEdition.matches.filterById(this._matchIds);
        }

        addChampionshipEditionClub(championshipEditionClub) {
            this._championshipEditionClubIds.push(championshipEditionClub.id);
        }

        addMatches(matches) {
            this._matchIds.concat(matches.map(m => m.id));
        }

        table() {
            return this.championshipEditionClubs.orderBy('-points', '-won', '-goalsDifference', '-goalsFor');
        }
    }
})();