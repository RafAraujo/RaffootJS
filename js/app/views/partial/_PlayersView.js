class _PlayersView {
    constructor(game) {
        this._game = game;

        document.querySelector('#players form').addEventListener('submit', event => {
            event.preventDefault();
            this._fillTable();
        });

        this._table = document.getElementById('table-players');
        this._tbody = document.querySelector('#table-players tbody');

        this._playersOrder = {
            properties: ['position.line', 'position.abbreviation'],
            direction: 1
        };
    }


    update() {
        HtmlHelper.hide(this._table);
    }

    _fillTable() {
        HtmlHelper.clearElement(this._tbody);

        for (let player of this._searchPlayers()) {
            let tr = this._tbody.insertRow();

            HtmlHelper.insertCell(tr, player.id, 'd-none', 'align-middle');
            HtmlHelper.insertCellWithTooltip(tr, player.position.abbreviation, player.position.name, 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, player.country.abbreviation, 'align-middle');
            HtmlHelper.insertCell(tr, player.completeName, 'align-middle');
            HtmlHelper.insertCell(tr, player.club.name, 'align-middle');
            HtmlHelper.insertCellWithTooltip(tr, player.side, player.sideDescription, 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, player.overall, 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, player.wage.toLocaleString(), 'align-middle', 'text-right');
            HtmlHelper.insertCell(tr, player.marketValue.toLocaleString(), 'align-middle', 'text-right');
            HtmlHelper.insertCellWithTooltip(tr, player.skillsAbbreviatedDescription, player.skillsDescription.split('/').join('<br>'), 'align-middle', 'text-center');
            HtmlHelper.insertCell(tr, player.age, 'align-middle', 'text-center');

            /*
            this._formatPosition(tr.children[1], player.position);
            this._formatOverall(tr.children[3], player);
            this._formatEnergy(tr.children[5], player.energy);
            this._formatAge(tr.children[9], player.age);
            this._formatContract(tr.children[10], contract);
            this._formatCondition(tr.children[11], player.condition);
            */
        }

        HtmlHelper.show(this._table);
    }

    _searchPlayers() {
        let players = Player.all()
        .firstItems(500).orderBy(...this._playersOrder.properties);

        if (this._playersOrder.direction === -1)
            players = players.reverse();

        return players;
    }
}