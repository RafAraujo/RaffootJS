class _PlayView {
    constructor(game) {
        this._game = game;

        this._divNextMatch = document.getElementById('play-next-match');
        this._selectFormations = document.getElementById('play-formations');
        this._table = document.getElementById('play-starting11');

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

    _buildCanvas(match) {
        let divContainerMyClub = document.getElementById('play-canvas-my-club');
        let divContainerOpponent = document.getElementById('play-canvas-opponent');

        this._canvasMyClub = new FootballField(match.matchClubHome.club, divContainerMyClub);
        this._canvasOpponent = new FootballField(match.matchClubHome.club, divContainerOpponent);

        this._canvasMyClub.build();
        this._canvasOpponent.build();
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

            let select = tr.children[1].querySelector('select');
            this._fillSelectSquadPlayersByFieldLocalization(select, fieldLocalization);
            select.value = sp.id;

            let span = tr.children[2].querySelector('span.overall');
            this._formatOverall(span, sp);
        });
    }

    _formatFieldLocalization(td, fieldLocalization) {
        td.innerText = fieldLocalization.position.abbreviation;
        Array.from(td.classList).forEach(className => td.classList.remove(className));
        td.classList.add('font-weight-bold', `text-${fieldLocalization.position.fieldRegion.color.class}`, 'text-center', `border-left-${fieldLocalization.position.fieldRegion.name}`);
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