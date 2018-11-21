let Contract = (function () {
    let _contracts = [];

    return class Contract extends Entity {
        constructor(clubId, playerId, fee, wage, beginDate, endDate) {
            super();

            this._clubId = clubId;
            this._playerId = playerId;
            this.fee = fee;
            this.wage = wage;
            this.beginDate = beginDate;
            this.endDate = endDate;
        }

        static create(club, player, fee, wage, beginDate, endDate) {
            let contract = new Contract(club.id, player.id, fee, wage, beginDate, endDate);
            contract.id = _contracts.push(contract);
            return contract;
        }

        static load(objects) {
            _contracts = objects.map(o => Object.assign(new Contract(), o));
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

        get remainingMonths() {
            return Date.monthDiff(Season.current().currentDate, this.endDate);
        }

        sign() {
            this.club.pay(this.fee);
            this.club.squad.add(this.player);
            this.player.contract = this;
            this.inForce = true;
        }
    }
})();