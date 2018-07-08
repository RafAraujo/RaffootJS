class Squad {
    constructor() {
        this.formation = null;
        this.squadPlayers = [];
    }
    
    generate(club) {
        this.formation = Formation.all().getRandomItem();

        let fieldRegions = FieldRegion.all();
        let date = Date.firstDayCurrentYear();

        for (let i = 0; i < fieldRegions.length; i++) {
            let fieldRegion = fieldRegions[i];
            let count = fieldRegion.name === 'goal' ?
                Random.numberBetween(2, 3) :
                Math.round(this.formation.fieldLocalizations.filter(fl => fl.position.fieldRegion === fieldRegion).length * Random.numberBetween(15, 25) / 10);

            for (let j = 0; j < count; j++) {
                let player = new Player(club.country, fieldRegion);
                let contract = new Contract(club, player, 'definitive', 0, player.baseWage, date,date.addMonths(Random.numberBetween(6, 24)));
                contract.sign();
            }
        }
    }

    set freeKickTaker(squadPlayer) {
        this.freeKickTaker = this.findPlayer(squadPlayer);
    }

    set penaltyTaker(squadPlayer) {
        this.penaltyTaker = this.findPlayer(squadPlayer);
    }

    findSquadPlayer(squadPlayer) {
        let found = this.squadPlayers.find(p => p.squadPlayer === squadPlayer);
        
        if (found == null)
            throw new ReferenceError('Squad.findSquadPlayer(squadPlayer)');

        return found;
    }

    get overall() {
        let value = 0;
        this.squadPlayers.forEach(sp => value += sp.player.overall);
        return value / this.squadPlayers.length;
    }

    get wage() {
        return this.squadPlayers.map(sp => sp.player).map(p => p.wage).sum();
    }

    add(player) {
        let squadPlayer = new SquadPlayer(this, player);
        this.squadPlayers.push(squadPlayer);
    }

    remove(player) {
        this.squadPlayers.remove(player);
    }

    rest(time) {
        this.squadPlayers.map(sp => sp.player).forEach(p => p.rest(time));
    }
}