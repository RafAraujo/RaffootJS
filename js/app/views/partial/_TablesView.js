class _TablesView {
    constructor(game) {
        this._game = game;

        this._section = document.getElementById('tables');
        this._selectChampionships = document.getElementById('select-championships');
        this._divContent = document.getElementById('tables-content');

        this._fillSelect();
        this._selectChampionships.addEventListener('change', this.update.bind(this));
    }

    update() {
        HtmlHelper.clearElement(this._divContent);

        this._showTable();

        $('[data-toggle="tooltip"]').tooltip();
    }

    _fillSelect() {
        HtmlHelper.clearSelect(this._selectChampionships);

        let championshipEditions = this._game.currentSeason.championshipEditions;

        championshipEditions.forEach(ce => this._selectChampionships.appendChild(new Option(ce.championship.name, ce.id)));
        this._selectChampionships.value = this._game.club.league.id;
    }

    _showTable() {
        if (!this._selectChampionships.value)
            return;

        let championshipEdition = ChampionshipEdition.all().find(ce => ce.id == this._selectChampionships.value);
        switch (championshipEdition.championship.championshipType.regulation) {
            case 'elimination':
                this._showTableElimination(championshipEdition);
                break;
            case 'groups':
                this._showTableGroups(championshipEdition);
                break;
            case 'round-robin':
                this._showTableRoundRobin(championshipEdition);
                break;
        }
    }

    _showTableRoundRobin(championshipEdition) {
        let table = HtmlHelper.createTable(['#', 'Club', 'P', 'M', 'W', 'D', 'L', 'GF', 'GA', 'GD']);
        HtmlHelper.setTooltip(table.children[0].children[0].children[2], 'Points');
        HtmlHelper.setTooltip(table.children[0].children[0].children[3], 'Matches');
        HtmlHelper.setTooltip(table.children[0].children[0].children[4], 'Wins');
        HtmlHelper.setTooltip(table.children[0].children[0].children[5], 'Draws');
        HtmlHelper.setTooltip(table.children[0].children[0].children[6], 'Losses');
        HtmlHelper.setTooltip(table.children[0].children[0].children[7], 'Goals For');
        HtmlHelper.setTooltip(table.children[0].children[0].children[8], 'Goals Against');
        HtmlHelper.setTooltip(table.children[0].children[0].children[9], 'Goals Difference');

        this._divContent.appendChild(table);
        let tbody = table.children[1];

        championshipEdition.table.forEach((championshipEditionClub, index) => {
            let tr = tbody.insertRow();

            HtmlHelper.insertCell(tr, index + 1, 'text-center');
            HtmlHelper.insertCell(tr, championshipEditionClub.club.name, 'text-left');
            HtmlHelper.insertCell(tr, championshipEditionClub.points, 'text-center');
            HtmlHelper.insertCell(tr, championshipEdition.championshipEditionFixture == null ? 0 : championshipEdition.championshipEditionFixture.number, 'text-center');
            HtmlHelper.insertCell(tr, championshipEditionClub.won, 'text-center');
            HtmlHelper.insertCell(tr, championshipEditionClub.drawn, 'text-center');
            HtmlHelper.insertCell(tr, championshipEditionClub.lost, 'text-center');
            HtmlHelper.insertCell(tr, championshipEditionClub.goalsFor, 'text-center');
            HtmlHelper.insertCell(tr, championshipEditionClub.goalsAgainst, 'text-center');
            HtmlHelper.insertCell(tr, championshipEditionClub.goalsDifference, 'text-center');
        });
    }
}