let _championshipTypes = [];

let championshipTypes = [];

class ChampionshipType {
    constructor(scope, format, regulation, twoLeggedTie) {
        this.id = championshipTypes.length + 1;
        this.scope = scope;
        this.format = format;
        this.regulation = regulation;
        this.twoLeggedTie = twoLeggedTie;
        this.championships = [];
    }

    static seed() {
        _championshipTypes.push(new ChampionshipType('national', 'cup', 'elimination', true));
        _championshipTypes.push(new ChampionshipType('national', 'league', 'round-robin', true));
        _championshipTypes.push(new ChampionshipType('continental', 'cup', 'groups', true));
        _championshipTypes.push(new ChampionshipType('continental', 'superCup', 'elimination', false));
        _championshipTypes.push(new ChampionshipType('worldwide', 'superCup', 'elimination', false));

        Object.freeze(_championshipTypes);
    }

    static all() {
        return _championshipTypes;
    }

    addChampionship(value) {
        this.championships.push(value);
    }
}