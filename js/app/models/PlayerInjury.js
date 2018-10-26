let PlayerInjury = (function () {
    let _playerInjuries = [];

    return class PlayerInjury extends Entity {
        constructor(type, date, recoveryTime) {
            super();

            this.type = type;
            this.date = date;
            this.recoveryTime = recoveryTime;
        }

        static create(type) {
            let recoveryTime = Random.numberBetween(1, 14);
            let playerInjury = new PlayerInjury(type, Season.current().date, recoveryTime);
            playerInjury.id = _playerInjuries.push(playerInjury);
            return playerInjury;
        }

        static load(objects) {
            _playerInjuries = objects.map(o => Object.assign(new PlayerInjury(), o));
        }

        static all() {
            return _playerInjuries;
        }

        isActive() {
            return this.date.addDays(this.recoveryTime) < Season.current().date;
        }
    }
})();