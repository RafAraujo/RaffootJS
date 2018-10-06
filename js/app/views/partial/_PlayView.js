class _PlayView {
    constructor(game) {
        this._game = game;

        this._divNextMatch = document.getElementById('play-next-match');
        this._selectFormations = document.getElementById('play-formations');
        this._table = document.getElementById('play-starting11');
        this._divContainerMyClub = document.getElementById('play-canvas-my-club');
        this._divContainerOpponent = document.getElementById('play-canvas-opponent');

        this._canvasMyClub = new FootballField(this._divContainerMyClub);
        this._canvasOpponent = new FootballField(this._divContainerOpponent);

        this._fillFormations();
    }

    update() {
        let nextMatch = this._game.currentSeason.nextMatch(this._game.club);

        this._fillJumbotron(nextMatch);
        this._buildCanvas(nextMatch);
        this._fillTable();
    }

    _fillJumbotron(match) {
        let h1 = this._divNextMatch.querySelector('h1');
        let p = this._divNextMatch.querySelector('p');

        h1.innerText = match.description;
        p.innerHTML = `${match.championshipEdition.name}<br>${match.date.toLocaleDateString()}`;
    }

    _fillFormations() {
        Formation.all().map(f => this._selectFormations.appendChild(new Option(f.name, f.id)));
        this._selectFormations.value = this._game.club.squad.formation.id;
    }

    _fillTable() {
        let rows = Array.from(this._table.querySelectorAll('tbody tr'));

        this._game.club.squad.starting11.orderBy('fieldLocalization.line', 'fieldLocalization.column').forEach((sp, index) => {
            let tr = rows[index];

            let fieldLocalization = sp.fieldLocalization;

            this._formatFieldLocalization(tr.children[0], sp.fieldLocalization);
            this._formatSquadPlayer(tr.children[1], fieldLocalization);
            this._formatOverall(tr.children[2], sp);
            this._formatEnergy(tr.children[3], sp.player.energy);
            this._formatCondition(tr.children[4], sp.player.condition);
        });
    }

    _formatFieldLocalization(td, fieldLocalization) {
        td.innerText = fieldLocalization.position.abbreviation;
        Array.from(td.classList).forEach(className => td.classList.remove(className));
        td.classList.add('font-weight-bold', `text-${fieldLocalization.position.fieldRegion.color.class}`, 'text-center', `border-left-${fieldLocalization.position.fieldRegion.name}`, 'pr-0');
        td.setAttribute('title', fieldLocalization.name);
    }

    _formatSquadPlayer(td, fieldLocalization) {
        let select = td.querySelector('select');

        Html.clearSelect(select);

        let optionGroups = [];

        FieldRegion.all().forEach(fieldRegion => {
            let optionGroup = document.createElement('optgroup');
            optionGroup.label = fieldRegion.name.toTitleCase();
            optionGroups.push(optionGroup);
            select.appendChild(optionGroup);
        });

        this._game.club.squad.substitutes.forEach(sp => {
            let optionGroup = optionGroups.find(og => og.label === sp.player.position.fieldRegion.name.toTitleCase());
            optionGroup.appendChild(new Option(sp.player.name, sp.id));
        });

        let squadPlayer = this._game.club.squad.squadPlayers.find(sp => sp.fieldLocalization === fieldLocalization);

        let optionGroup = optionGroups.find(og => og.label === squadPlayer.player.position.fieldRegion.name.toTitleCase());
        optionGroup.appendChild(new Option(squadPlayer.player.name, squadPlayer.id));

        select.value = squadPlayer.id;
    }

    _formatOverall(td, squadPlayer) {
        td.classList.add('pl-0');
        let span = td.querySelector('span');
        span.innerText = squadPlayer.overall;
        Array.from(span.classList).forEach(className => span.classList.remove(className));
        span.classList.add('overall', `bg-${squadPlayer.category}`, 'pl-0', 'pr-0');
    }

    _formatEnergy(td, energy) {
        td.innerText = '';
        td.classList.add('pl-0');

        let backgroundClass = `bg-${(energy >= 70 ? 'success' : energy >= 50 ? 'warning' : 'danger')}`;
        let divProgress = Html.createProgressBar(energy, backgroundClass);
        td.appendChild(divProgress);
    }

    _formatCondition(td, condition) {
        Html.formatCellPlayerCondition(td, condition);
        td.classList.add('pr-0');
    }

    _buildCanvas(match) {
        this._canvasMyClub.club = this._game.club;
        this._canvasMyClub.build();
    }
}