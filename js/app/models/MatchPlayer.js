class MatchPlayer  {
    constructor(matchClub, squadPlayer) {
        this.matchClub = matchClub;
        this.squadPlayer = squadPlayer;
        this.marker = null;
        this.yellowCard = false;
        this.redCard = false;
        this.rating = 5;
    }

    get fieldLocalization() {
        return this.squadPlayer.fieldLocalization;
    }

    get player() {
        return this.squadPlayer.player;
    }

    get overall() {
        return this.redCard ? 0 : this.squadPlayer.overall;
    }

    get playersAhead() {
        return this.matchClub.matchPlayers.filter(mp => mp.fieldLocalization.line > this.fieldLocalization.line);
    }

    chooseAction() {
        let result = Random.number(100);

        switch (this.fieldLocalization.position.fieldRegion.name) {
            case 'goal':
                return 'passing';
            case 'defense':
                return result > this.fieldLocalization.line * 1 ? 'passing' : 'finishing';
            case 'midfield':
                return result > this.fieldLocalization.line * 2 ? 'passing' : 'finishing';
            case 'attack':
                return result > this.fieldLocalization.line * 3 ? 'passing' : 'finishing';
        }
    }

    score() {
        this.matchClub.addGoal();
    }

    addYellowCard() {
        if (this.yellowCard)
            this.redCard = true;
        this.yellowCard = true;
    }
}