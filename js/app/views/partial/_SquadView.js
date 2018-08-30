class _SquadView {
    constructor(squad) {
        this._squad = squad;

        this._tbody = document.querySelector('#table-squad tbody');

        this._squadOrder = {
            properties: ['position.line', 'position.abbreviation', '-overall'],
            direction: -1
        };
    }

    update(orderProperties) {
        HtmlHelper.clearTbody(this._tbody);

        for (let player of this._getPlayers(orderProperties)) {
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

    _getPlayers(orderProperties) {
        if (!orderProperties)
            orderProperties = this._squadOrder.properties;

        let players = this._squad.players.orderBy(...orderProperties);
        
        this._squadOrder.direction *= (JSON.stringify(orderProperties) === JSON.stringify(this._squadOrder.properties)) ? -1 : 1;
        this._squadOrder.properties = orderProperties;
        
        if (this._squadOrder.direction === - 1)
            players = players.reverse();
        
        return players;
    }
}