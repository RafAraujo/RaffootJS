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
    }

    _fillSelect() {
        HtmlHelper.clearSelect(this._selectChampionships);

        let championshipEditions = this._game.currentSeason.championshipEditions.orderBy('championship.country.name', 'championship.division');

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
        let table = HtmlHelper.createTable(null, ['#', 'Club', 'Points', 'M', 'W', 'D', 'L', 'GF', 'GA', 'GD']);
        HtmlHelper.setTooltip(table.children[0].children[0].children[3], 'Matches');
        HtmlHelper.setTooltip(table.children[0].children[0].children[4], 'Wins');
        HtmlHelper.setTooltip(table.children[0].children[0].children[5], 'Draws');
        HtmlHelper.setTooltip(table.children[0].children[0].children[6], 'Losses');
        HtmlHelper.setTooltip(table.children[0].children[0].children[7], 'Goals For');
        HtmlHelper.setTooltip(table.children[0].children[0].children[8], 'Goals Against');
        HtmlHelper.setTooltip(table.children[0].children[0].children[9], 'Goals Difference');

        championshipEdition.table.forEach((championshipEditionClub, index) => {
            let tr = table.children[1].insertRow();

            let position = index + 1;

            HtmlHelper.insertCell(tr, position, 'text-center');
            HtmlHelper.insertCell(tr, championshipEditionClub.club.name, 'text-left');
            HtmlHelper.insertCell(tr, championshipEditionClub.points, 'text-center');
            HtmlHelper.insertCell(tr, championshipEdition.championshipEditionFixturesPlayed, 'text-center');
            HtmlHelper.insertCell(tr, championshipEditionClub.won, 'text-center');
            HtmlHelper.insertCell(tr, championshipEditionClub.drawn, 'text-center');
            HtmlHelper.insertCell(tr, championshipEditionClub.lost, 'text-center');
            HtmlHelper.insertCell(tr, championshipEditionClub.goalsFor, 'text-center');
            HtmlHelper.insertCell(tr, championshipEditionClub.goalsAgainst, 'text-center');
            HtmlHelper.insertCell(tr, championshipEditionClub.goalsDifference, 'text-center');

            this._formatPosition(tr.children[0], championshipEdition, position);

            if (championshipEditionClub.club === this._game.club)
                Array.from(tr.children).forEach(td => td.classList.add('font-weight-bold'));
        });

        this._divContent.appendChild(table);
        $('[data-toggle="tooltip"]:not(.d-none)').tooltip();
    }

    _formatPosition(td, championshipEdition, position) {
        if (championshipEdition.promotionZonePositions.includes(position)) {
            td.classList.add('text-promotion-zone');
            HtmlHelper.setTooltip(td, 'Promotion Zone');
        }
        else if (championshipEdition.relegationZonePositions.includes(position)) {
            td.classList.add('text-relegation-zone');
            HtmlHelper.setTooltip(td, 'Relegation Zone');
        }

        if (championshipEdition.continentalCupClassificationZonePositions(2).includes(position)) {
            td.classList.add('text-secondary-continental-cup-classification-zone');
            HtmlHelper.setTooltip(td, championshipEdition.championship.country.confederation.cupName(2));
        }
        else if (championshipEdition.continentalCupClassificationZonePositions(1).includes(position)) {
            td.classList.add('text-main-continental-cup-classification-zone');
            HtmlHelper.setTooltip(td, championshipEdition.championship.country.confederation.cupName(1));
        }
    }

    _showTableElimination(championshipEdition) {
        championshipEdition.championshipEditionEliminationPhases.forEach(eliminationPhase => {

            if (eliminationPhase.championshipEditionEliminationPhaseDuels.length === 0)
                return;
            let table = HtmlHelper.createTable(eliminationPhase.name, ['Club 1', 'Aggregate', 'Club 2', '1st Leg', '2nd Leg']);

            eliminationPhase.championshipEditionEliminationPhaseDuels.forEach(duel => {
                let tr = table.children[1].insertRow();

                HtmlHelper.insertCell(tr, duel.clubs.first().name, 'text-right');
                HtmlHelper.insertCell(tr, duel.aggregate, 'text-center');
                HtmlHelper.insertCell(tr, duel.clubs.last().name, 'text-left');
                HtmlHelper.insertCell(tr, duel.matches.first().score, 'text-center');
                HtmlHelper.insertCell(tr, duel.matches.last().scoreReverse, 'text-center');

                if (duel.clubs.includes(this._game.club))
                    tr.classList.add('border-my-club');
            });

            this._divContent.appendChild(table);
        });
    }
}