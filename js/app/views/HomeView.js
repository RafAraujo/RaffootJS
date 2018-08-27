class HomeView {
    constructor() {

    }

    update(game, section) {
        this._showSquad(game.club.squad);
    }

    _showSquad(squad) {
        let table = document.querySelector('#table-squad tbody');

        for (let player of squad.players) {
            let row = table.insertRow();

            row.insertCell().innerText = player.position.abbreviation;
            row.insertCell();
            row.insertCell().innerText = player.completeName;
            row.insertCell().innerText = player.side;
            row.insertCell().innerText = player.overall;
            row.insertCell().innerText = player.energy;
            row.insertCell().innerText = player.skillsDescription;
            row.insertCell().innerText = player.age;
            row.insertCell().innerText = player.condition;
        }
    }
}