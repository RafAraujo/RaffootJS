let PlayerInjury = (function () {
    let _playerInjuries = [];

    return class PlayerInjury extends Entity {
        constructor(type) {
            super();

            this.type = type;
        }

        static create(player, type) {
            let playerInjury = new PlayerInjury(player.id, type);
            playerInjury.id = _playerInjuries.push(playerInjury);
            return playerInjury;
        }
    }
})();