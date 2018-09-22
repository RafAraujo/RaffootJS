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

            tr.children[0].innerText = fieldLocalization.name;

            let select = tr.children[1].querySelector('select');
            this._fillSelectSquadPlayersByFieldLocalization(select, fieldLocalization);
            select.value = sp.id;

            let span = tr.children[2].querySelector('span.overall');
            this._updateOverall(span, sp);
        });
    }

    _updateOverall(span, squadPlayer) {
        span.innerText = squadPlayer.overall;
        Array.from(span.classList).forEach(className => span.classList.remove(className));
        span.classList.add('overall', `bg-${squadPlayer.player.category}`);
    }

    _fillSelectSquadPlayersByFieldLocalization(select, fieldLocalization) {
        Html.clearSelect(select);

        for (let league of leagues) {
            let optionGroup = document.createElement('optgroup');
            optionGroup.label = `Division ${league.championship.division}`;
            league.clubs.orderBy('name').forEach(c => optionGroup.appendChild(new Option(c.name, c.id)));
            this._selectClub.appendChild(optionGroup);
        }
    }
}