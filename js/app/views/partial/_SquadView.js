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
            HtmlHelper.insertCellWithTooltip(tr, player.position.abbreviation, player.position.name, ...this._positionClasses(player.position));
            HtmlHelper.insertCell(tr, player.completeName, 'align-middle');
            
            let td = HtmlHelper.insertCell(tr, player.overall, 'align-middle', 'text-center', 'border', `bg-${this._overallColorClass(player)}`);
            if (player.star) {
                let icon = HtmlHelper.icon('star', Bootstrap.yellow().color);
                HtmlHelper.setTooltip(td, icon.outerHTML, 'left');
                td.classList.add('td-player-star');
            }

            HtmlHelper.insertCellWithTooltip(tr, player.side, sides.find(s => s.substr(0, 1) === player.side), 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, HtmlHelper.createProgressBar(player.energy, `bg-${this._energyColorClass(player.energy)}`).outerHTML, 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, player.wage.toLocaleString(), 'text-right');
            HtmlHelper.insertCell(tr, player.marketValue.toLocaleString(), 'text-right');
            HtmlHelper.insertCellWithTooltip(tr, player.skillsAbbreviatedDescription, player.skillsDescription.split('/').join('<br>'), 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, player.age, 'align-middle', 'text-center', `text-${this._ageColorClass(player.age)}`);
            
            td = HtmlHelper.insertCell(tr, '', 'align-middle', 'text-center');
            this._formatCondition(td, player.condition);
        }

        $('[data-toggle="tooltip"]').tooltip();
    }

    _positionClasses(position) {
        let bootstrapColorName = '';

        switch (position.fieldRegion.name) {
            case 'goal':
                bootstrapColorName = Bootstrap.yellow().class;
                break;
            case 'defense':
                bootstrapColorName = Bootstrap.blue().class;
                break;
            case 'midfield':
                bootstrapColorName = Bootstrap.green().class;
                break;
            case 'attack':
                bootstrapColorName = Bootstrap.red().class;
                break;
        }

        return ['align-middle', 'text-center', 'font-weight-bold', `text-${bootstrapColorName}`, 'border', `border-left-${position.fieldRegion.name}`];
    }

    _overallColorClass(player) {
        return player.overall >= 80 ? 'gold' : player.overall >= 60 ? 'silver' : 'bronze';
    }

    _energyColorClass(energy) {
        return energy >= 70 ? 'success' : value >= 50 ? Bootstrap.yellow().class : Bootstrap.red().class;
    }

    _ageColorClass(age) {
        return age >= 32 ? Bootstrap.red().class : Bootstrap.blue().class;
    }

    _formatCondition(td, condition) {
        let icon = null;
        let tooltipIcon = null;

        switch (condition) {
            case 1:
                icon = HtmlHelper.icon('angle-double-down', Bootstrap.purple().color, 'fa-lg');
                tooltipIcon = HtmlHelper.icon('tired', 'gold', 'fa-2x');
                break;
            case 2:
                icon = HtmlHelper.icon('angle-down', Bootstrap.blue().color, 'fa-lg');
                tooltipIcon = HtmlHelper.icon('frown', 'gold', 'fa-2x');
                break;
            case 3:
                icon = HtmlHelper.icon('angle-right', Bootstrap.green().color, 'fa-lg');
                tooltipIcon = HtmlHelper.icon('meh-blank', 'gold', 'fa-2x');
                break;
            case 4:
                icon = HtmlHelper.icon('angle-up', Bootstrap.orange().color, 'fa-lg');
                tooltipIcon = HtmlHelper.icon('smile', 'gold', 'fa-2x');
                break;
            case 5:
                icon = HtmlHelper.icon('angle-double-up', Bootstrap.red().color, 'fa-lg');
                tooltipIcon = HtmlHelper.icon('grin-squint', 'gold', 'fa-2x');
                break;
        }

        td.appendChild(icon);
        HtmlHelper.setTooltip(td, tooltipIcon.outerHTML, 'right', 'fa-lg');
    }
}
