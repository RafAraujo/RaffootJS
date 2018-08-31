class _SquadView {
    constructor(game) {
        this._game = game;

        this._tbody = document.querySelector('#table-squad tbody');

        this._squadOrder = {
            properties: ['position.line', 'position.abbreviation', '-overall'],
            direction: -1
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
        if (!orderProperties)
            orderProperties = this._squadOrder.properties;
        
        this._squadOrder.direction *= (JSON.stringify(orderProperties) === JSON.stringify(this._squadOrder.properties)) ? -1 : 1;
        this._squadOrder.properties = orderProperties;
    }

    _fillTable() {
        HtmlHelper.clearTbody(this._tbody);

        for (let player of this._players) {
            let tr = this._tbody.insertRow();

            HtmlHelper.insertCell(tr, player.id, 'd-none', 'align-middle');
            HtmlHelper.insertCell(tr, player.position.abbreviation, 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, player.star ? '&starf;' : '', 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, player.completeName, 'align-middle',);
            HtmlHelper.insertCell(tr, player.side, 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, player.overall, 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, player.energy, 'align-middle', 'text-center');

            let td = HtmlHelper.insertCell(tr, player.skillsAbbreviatedDescription, 'align-middle', 'text-center');
            td.setAttribute('data-toggle', 'tooltip');
            td.setAttribute('data-placement', 'bottom');
            td.setAttribute('data-html', 'true');
            td.setAttribute('title', player.skillsDescription.split('/').join('<br>'));
            
            HtmlHelper.insertCell(tr, player.age, 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, player.condition, 'align-middle', 'text-center');
        }

        $('[data-toggle="tooltip"]').tooltip();
    }
}