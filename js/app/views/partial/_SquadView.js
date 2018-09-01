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

            let contract = player.currentContract;

            HtmlHelper.insertCell(tr, player.id, 'd-none', 'align-middle');
            HtmlHelper.insertCellWithTooltip(tr, player.position.abbreviation, player.position.name, 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, player.completeName, 'align-middle');
            HtmlHelper.insertCell(tr, player.overall, 'align-middle', 'text-center');
            HtmlHelper.insertCellWithTooltip(tr, player.side, sides.find(s => s.substr(0, 1) === player.side), 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, '', 'align-middle');
            HtmlHelper.insertCell(tr, player.wage.toLocaleString(), 'text-right');
            HtmlHelper.insertCell(tr, player.marketValue.toLocaleString(), 'text-right');
            HtmlHelper.insertCellWithTooltip(tr, player.skillsAbbreviatedDescription, player.skillsDescription.split('/').join('<br>'), 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, player.age, 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, contract.endDate.toLocaleDateString(), 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, '', 'align-middle', 'text-center');
            
            this._formatPosition(tr.children[1], player.position);
            this._formatOverall(tr.children[3], player);
            this._formatEnergy(tr.children[5], player.energy);
            this._formatAge(tr.children[9], player.age);
            this._formatContract(tr.children[10], contract);
            this._formatCondition(tr.children[11], player.condition);
        }

        $('[data-toggle="tooltip"]').tooltip();
    }

    _formatPosition(td, position) {
        td.classList.add('font-weight-bold', `text-${position.fieldRegion.color.class}`, 'border', `border-left-${position.fieldRegion.name}`);
    }

    _formatOverall(td, player) {
        td.classList.add('border', `bg-${player.category}`);

        if (player.star) {
            let icon = HtmlHelper.icon('star', Bootstrap.yellow().color);
            HtmlHelper.setTooltip(td, icon.outerHTML, 'left');
            td.classList.add('td-player-star');
        }
    }

    _formatEnergy(td, energy) {
        let backgroundClass = `bg-${(energy >= 70 ? Bootstrap.green().class : energy >= 50 ? Bootstrap.yellow().class : Bootstrap.red().class)}`;
        let divProgress = HtmlHelper.createProgressBar(energy, backgroundClass);
        td.appendChild(divProgress);
    }

    _formatAge(td, age) {
        let textColorClass = `text-${(age >= 32 ? Bootstrap.red().class : Bootstrap.blue().class)}`;
        td.classList.add(textColorClass);
    }
    
    _formatAge(td, age) {
        let textColorClass = `text-${(age >= 32 ? Bootstrap.red().class : Bootstrap.blue().class)}`;
        td.classList.add(textColorClass);
    }

    _formatContract(td, contract) {
        if (Date.monthDiff(this._game.currentSeason.currentDate, contract.endDate) < 3)
            td.classList.add(`text-${Bootstrap.red().class}`);
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
