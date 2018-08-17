let Contract = (function() {
    let _contracts = [];

    return class Contract extends Entity {
        constructor(clubId, playerId, type, fee, wage, beginDate, endDate) {
            super();

            this._clubId = clubId;
            this._playerId = playerId;
            this.type = type;
            this.fee = fee;
            this.wage = wage;
            this.beginDate = beginDate;
            this.endDate = endDate;
        }

        static create(club, player, type, fee, wage, beginDate, endDate) {
            let contract = new Contract(club.id, player.id, type, fee, wage, beginDate, endDate);
            contract.id = _contracts.push(contract);
            return contract;
        }

        static load(object) {
            let contract = new Contract();
            _contracts.push(Object.assign(object, contract));
            return contract;
        }

        static all() {
            return _contracts;
        }

        get club() {
            return Club.all()[this._clubId - 1];
        }

        get player() {
            return Player.all()[this._playerId - 1];
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
})();