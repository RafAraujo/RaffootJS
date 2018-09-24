class _PlayView {
    constructor(game) {
        this._game = game;

        this._selectFormations = document.getElementById('play-formations');
        this._table = document.getElementById('play-starting11');
        this._divCanvas = document.getElementById('play-canvas');
        this._component = new FootballField(this._game.club, this._divCanvas);

        this._fillFormations();
        this._fillTable();
        window.addEventListener('resize', this._component.draw.bind(this._component));
    }

    update() {
        this._component.build();
        this._fillTable();
    }

    _fillFormations() {
        Html.fillSelect(this._selectFormations, Formation.all());
        this._selectFormations.value = this._game.club.squad.formation.id;
    }

    _fillTable() {
        let rows = Array.from(this._table.querySelectorAll('tbody tr'));

        this._game.club.squad.starting11.orderBy('fieldLocalization.line', 'fieldLocalization.column').forEach((sp, index) => {
            let tr = rows[index];

            let fieldLocalization = sp.fieldLocalization;

            this._formatFieldLocalization(tr.children[0], sp.fieldLocalization);

            let select = tr.children[1].querySelector('select');
            this._fillSelectSquadPlayersByFieldLocalization(select, fieldLocalization);
            select.value = sp.id;

            let span = tr.children[2].querySelector('span.overall');
            this._formatOverall(span, sp);
        });
    }

    _formatFieldLocalization(td, fieldLocalization) {
        td.innerText = fieldLocalization.name;
        Array.from(td.classList).forEach(className => td.classList.remove(className));
        td.classList.add('font-weight-bold', `text-${fieldLocalization.position.fieldRegion.color.class}`, 'text-center', 'border', `border-left-${fieldLocalization.position.fieldRegion.name}`);
        td.setAttribute('title', fieldLocalization.name);
    }

    _formatOverall(span, squadPlayer) {
        span.innerText = squadPlayer.overall;
        Array.from(span.classList).forEach(className => span.classList.remove(className));
        span.classList.add('overall', `bg-${squadPlayer.category}`);
    }

    _fillSelectSquadPlayersByFieldLocalization(select, fieldLocalization) {
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
}