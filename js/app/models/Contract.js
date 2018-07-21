let _contracts = [];

class Contract {
    constructor(club, player, type, fee, wage, beginDate, endDate) {
        this.id = _contracts.length + 1;
        this.club = club;
        this.player = player;
        this.type = type;
        this.fee = fee;
        this.wage = wage;
        this.beginDate = beginDate;
        this.endDate = endDate;

        _contracts.push(this);
    }

    sign() {
        this.club.pay(this.fee);
        
        let previousContract = this.player.contracts.filter(c => c.inForce && c.type === 'definitive').last();
        if (previousContract != null)
            previousContract.revoke();
        
        this.club.squad.add(this.player);
        this.player.addContract(this);
        this.inForce = true;
    }

    revoke() {
        this.club.receive(this.fee);
        this.club.squad.remove(this.player);
        this.inForce = false;
    }
}