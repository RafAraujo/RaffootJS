class _TablesView {
    constructor(game) {
        this._game = game;

        this._section = document.getElementById('tables');
        this._selectChampionships = document.getElementById('tables-championships');
        this._divContent = document.getElementById('tables-content');
        this._tables = [];

        this._fillSelect();
        this._selectChampionships.addEventListener('change', this.update.bind(this));
    }

    get _championshipEdition() {
        return ChampionshipEdition.all().find(ce => ce.id == this._selectChampionships.value);
    }

    get _regulation() {
        return this._championshipEdition.championship.championshipType.regulation;
    }

    update() {
        Html.clearElement(this._divContent);

        this._createTables();
    }

    _fillSelect() {
        Html.clearSelect(this._selectChampionships);

        let championshipEditions = this._game.currentSeason.championshipEditions.orderBy('championship.country.name', 'championship.division');

        championshipEditions.forEach(ce => this._selectChampionships.appendChild(new Option(ce.championship.name, ce.id)));
        this._selectChampionships.value = this._game.club.league.id;
    }

    _createTables() {
        this._tables = [];

        if (!this._championshipEdition)
            return;

        switch (this._regulation) {
            case 'elimination':
                this._createTableElimination();
                break;
            case 'groups':
                this._createTableGroups();
                break;
            case 'round-robin':
                this._createTableRoundRobin();
                break;
        }

        this._tables.forEach(t => this._divContent.appendChild(t));

        this._optimizeTablesForMobile();
    }

    _createTableRoundRobin() {
        let table = Html.createTable(null, ['#', 'Club', 'P', 'M', 'W', 'D', 'L', 'GF', 'GA', 'GD'], 'table-hover');
        this._tables.push(table);

        let thead = table.querySelector('thead');
        let tbody = table.querySelector('tbody');

        let tr = thead.querySelector('tr');

        Html.setTooltip(tr.children[3], 'Points');
        Html.setTooltip(tr.children[3], 'Matches');
        Html.setTooltip(tr.children[4], 'Wins');
        Html.setTooltip(tr.children[5], 'Draws');
        Html.setTooltip(tr.children[6], 'Losses');
        Html.setTooltip(tr.children[7], 'Goals For');
        Html.setTooltip(tr.children[8], 'Goals Against');
        Html.setTooltip(tr.children[9], 'Goals Difference');

        this._championshipEdition.table.forEach((championshipEditionClub, index) => {
            let tr = tbody.insertRow();

            let position = index + 1;

            Html.insertCell(tr, position, 'text-center');
            Html.insertCell(tr, championshipEditionClub.club.name, 'text-left');
            Html.insertCell(tr, championshipEditionClub.points, 'text-center', 'font-weight-bold');
            Html.insertCell(tr, this._championshipEdition.championshipEditionFixturesPlayed, 'text-center');
            Html.insertCell(tr, championshipEditionClub.won, 'text-center');
            Html.insertCell(tr, championshipEditionClub.drawn, 'text-center');
            Html.insertCell(tr, championshipEditionClub.lost, 'text-center');
            Html.insertCell(tr, championshipEditionClub.goalsFor, 'text-center');
            Html.insertCell(tr, championshipEditionClub.goalsAgainst, 'text-center');
            Html.insertCell(tr, championshipEditionClub.goalsDifference, 'text-center');

            this._formatPosition(tr.children[0], position);

            if (championshipEditionClub.club === this._game.club)
                tr.classList.add('border-my-club');
        });
    }

    _formatPosition(td, position) {
        if (this._championshipEdition.promotionZonePositions.includes(position)) {
            td.classList.add('text-promotion-zone');
            Html.setTooltip(td, 'Promotion Zone');
        }
        else if (this._championshipEdition.relegationZonePositions.includes(position)) {
            td.classList.add('text-relegation-zone');
            Html.setTooltip(td, 'Relegation Zone');
        }

        if (this._championshipEdition.continentalCupClassificationZonePositions(2).includes(position)) {
            td.classList.add('text-secondary-continental-cup-classification-zone');
            Html.setTooltip(td, this._championshipEdition.championship.country.confederation.cupName(2));
        }
        else if (this._championshipEdition.continentalCupClassificationZonePositions(1).includes(position)) {
            td.classList.add('text-main-continental-cup-classification-zone');
            Html.setTooltip(td, this._championshipEdition.championship.country.confederation.cupName(1));
        }
    }

    _createTableElimination() {
        this._championshipEdition.championshipEditionEliminationPhases.forEach(eliminationPhase => {

            if (eliminationPhase.championshipEditionEliminationPhaseDuels.length === 0)
                return;

            let table = Html.createTable(eliminationPhase.name, ['Club 1', 'Agg.', 'Club 2', '1st Leg', '2nd Leg'], 'table-hover');
            this._tables.push(table);

            eliminationPhase.championshipEditionEliminationPhaseDuels.forEach(duel => {
                let tr = table.children[1].insertRow();

                Html.insertCell(tr, duel.clubs[0].name, 'text-right');
                Html.insertCell(tr, duel.aggregate, 'text-center');
                Html.insertCell(tr, duel.clubs[1].name, 'text-left');
                Html.insertCell(tr, duel.matches[0].score, 'text-center');
                Html.insertCell(tr, duel.matches[1].scoreReverse, 'text-center');

                if (duel.clubs.includes(this._game.club))
                    tr.classList.add('border-my-club');
            });
        });
    }

    _optimizeTablesForMobile() {
        this._tables.forEach(table => {
            Array.from(table.children).filter(section => section != null).forEach(section => {
                Array.from(section.children).forEach(row => {
                    Array.from(row.children).forEach((cell, index) => {

                        switch (this._regulation) {
                            case 'elimination':
                                if (index > 2)
                                    cell.classList.add('d-none', 'd-sm-table-cell');
                                break;
                            case 'groups':
                                if (false) // TO-DO
                                    cell.classList.add('d-none', 'd-sm-table-cell');
                                break;
                            case 'round-robin':
                                if (index > 4 && index < 9)
                                    cell.classList.add('d-none', 'd-sm-table-cell');
                                break;
                        }
                    });
                });
            });
        });
    }
}