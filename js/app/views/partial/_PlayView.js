class _PlayView {
    constructor(game) {
        this._game = game;

        this._divNextMatch = document.getElementById('play-next-match');
        this._selectFormations = document.getElementById('play-formations');
        this._table = document.getElementById('play-starting11');
        this._divCanvas = document.getElementById('play-canvas-my-club');

        this._component = new FootballField(this._divCanvas);

        this._fillFormations();
    }

    update() {
        let nextMatch = this._game.nextMatch;

        this._fillJumbotron(nextMatch);
        this._buildCanvas();
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
            this._formatEnergy(tr.children[1], new PlayerEnergy(sp.player.energy));
            this._formatCondition(tr.children[3], sp.player.condition);
            this._formatStatus(tr.children[4], sp.player);
        });
        setTimeout(() => $('[data-toggle="tooltip"]').tooltip(), 0);
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

        FieldRegion.all().forEach(fr => {
            let optionGroup = document.createElement('optgroup');
            optionGroup.label = fr.name.toTitleCase();
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
        span.classList.add('overall', `bg-${squadPlayer.category}`, 'pl-0', 'pr-0', 'mx-auto');
    }

    _formatEnergy(td, energy) {
        let divProgress = td.querySelector('div.progress');
        divProgress.children[0].classList.remove('bg-success', 'bg-warning', 'bg-danger');
        divProgress.children[0].classList.add(`bg-${energy.color.class}`);
        divProgress.children[0].style.width = `${energy.value}%`;
        divProgress.children[0].innerText = '';
        divProgress.style.height = '0.25rem';
    }

    _formatCondition(td, condition) {
        Html.formatCellPlayerCondition(td, condition);
        td.classList.add('pr-0');
    }

    _formatStatus(td, player) {
        Html.clearElement(td);

        if (player.injuried) {
            let icon = Html.createIcon('ambulance', RED);
            td.appendChild(icon);
        }
        td.classList.add('pr-0');
    }

    _buildCanvas() {
        this._component.club = this._game.club;
        this._component.build();
    }
}