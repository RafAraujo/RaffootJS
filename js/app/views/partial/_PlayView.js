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

        let squadPlayer = this._game.club.squad.squadPlayers.find(sp => sp.fieldLocalization === fieldLocalization);

        select.appendChild(new Option(squadPlayer.player.name, squadPlayer.id));

        let substitutes = this._game.club.squad.substitutes;

        let recommended = substitutes.filter(sp => sp.player.position === fieldLocalization.position);
        let other = substitutes.filter(sp => !recommended.includes(sp));

        if (recommended.length > 0) {
            let optionGroup = document.createElement('optgroup');
            optionGroup.label = 'Recommended';
            recommended.forEach(sp => optionGroup.appendChild(new Option(sp.player.name, sp.id)));
            select.appendChild(optionGroup);

            optionGroup = document.createElement('optgroup');
            optionGroup.label = 'Other';
            other.forEach(sp => optionGroup.appendChild(new Option(sp.player.name, sp.id)));
            select.appendChild(optionGroup);
        }
        else
        {
            substitutes.forEach(sp => {
                select.appendChild(new Option(sp.player.name, sp.id));
            });
        }

        select.value = squadPlayer.id;
    }
}