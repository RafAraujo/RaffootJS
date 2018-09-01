class _SquadView {
    constructor(game) {
        this._game = game;

        this._tbody = document.querySelector('#table-squad tbody');

        this._squadOrder = {
            properties: ['position.line', 'position.abbreviation', '-overall'],
            direction: 1
        };
    }

    get _players() {
        let players = this._game.club.squad.players.orderBy(...this._squadOrder.properties);

        if (this._squadOrder.direction === -1)
            players = players.reverse();
        
        return players;
    }

    update(orderProperties) {
        this._updateOrder(orderProperties);
        this._fillTable();
    }

    _updateOrder(orderProperties) {       
        this._squadOrder.direction = (JSON.stringify(orderProperties) === JSON.stringify(this._squadOrder.properties)) ? this._squadOrder.direction * -1 : 1;
        
        if (!orderProperties)
            orderProperties = this._squadOrder.properties;
        this._squadOrder.properties = orderProperties;
    }

    _fillTable() {
        HtmlHelper.clearTbody(this._tbody);

        let sides = ['Center', 'Left', 'Right'];

        for (let player of this._players) {
            let tr = this._tbody.insertRow();

            HtmlHelper.insertCell(tr, player.id, 'd-none', 'align-middle');

            let fieldRegionColorClass = this._fieldRegionColorClass(player.position.fieldRegion);
            let td = HtmlHelper.insertCell(tr, player.position.abbreviation, 'align-middle', 'text-center', 'font-weight-bold', `text-${fieldRegionColorClass}`, 'border');
            td.style.cssText = `border-left: solid ${HtmlHelper.bootstrapColor(fieldRegionColorClass)} !important`;
            HtmlHelper.setTooltip(td, player.position.name);

            HtmlHelper.insertCell(tr, player.star ? '&starf;' : '', 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, player.completeName, 'align-middle',);
            
            HtmlHelper.insertCell(tr, player.overall, 'align-middle', 'text-center', 'border', `bg-${this._overallColorClass(player.overall)}`);

            td = HtmlHelper.insertCell(tr, player.side, 'align-middle', 'text-center');
            HtmlHelper.setTooltip(td, sides.find(s => s.substr(0, 1) === player.side));

            td = HtmlHelper.insertCell(tr, '', 'align-middle', 'text-center');
            let divProgress = HtmlHelper.createProgressBar(player.energy, `bg-${this._energyColorClass(player.energy)}`);
            td.appendChild(divProgress);
            HtmlHelper.setTooltip(divProgress, player.energy);

            HtmlHelper.insertCell(tr, player.wage.toLocaleString(), 'text-right');
            HtmlHelper.insertCell(tr, player.marketValue.toLocaleString(), 'text-right');

            td = HtmlHelper.insertCell(tr, player.skillsAbbreviatedDescription, 'align-middle', 'text-center');
            HtmlHelper.setTooltip(td, player.skillsDescription.split('/').join('<br>'));

            HtmlHelper.insertCell(tr, player.age, 'align-middle', 'text-center', `text-${this._ageColorClass(player.age)}`);
            HtmlHelper.insertCell(tr, player.condition, 'align-middle', 'text-center');
        }

        $('[data-toggle="tooltip"]').tooltip();
    }

    _fieldRegionColorClass(value) {
        switch (value.name) {
            case 'goal':
                return 'warning';
            case 'defense':
                return 'primary';
            case 'midfield':
                return 'success';
            case 'attack':
                return 'danger';
            default:
                return 'secondary';
        }
    }

    _overallColorClass(value) {
        return value >= 80 ? 'gold' : value >= 60 ? 'silver' : 'bronze';
    }

    _energyColorClass(value) {
        return value >= 70 ? 'success' : value >= 50 ? 'warning' : 'danger';
    }

    _ageColorClass(value) {
        return value >= 32 ? 'danger' : 'primary';
    }
}
