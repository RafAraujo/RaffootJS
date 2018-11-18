let PlayersTable = (function () {
    const _HEADER = {
        items: [
            {
                title: 'POS',
                description: 'Position',
                orderProperties: ['position.line', 'position.abbreviation', 'name']
            },
            {
                title: '',
                description: 'Country',
                orderProperties: ['country.name']
            },
            {
                title: 'Name',
                orderProperties: ['name']
            },
            {
                title: 'OV',
                description: 'Overall',
                orderProperties: ['overall']
            },
            {
                title: 'PS',
                description: 'Preferred Side',
                orderProperties: ['side']
            },
            {
                title: 'Energy',
                orderProperties: ['energy']
            },
            {
                title: 'Club',
                orderProperties: ['club.name']
            },
            {
                title: 'Wage',
                orderProperties: ['wage']
            },
            {
                title: 'Market Value',
                orderProperties: ['marketValue']
            },
            {
                title: 'Age',
                orderProperties: ['age']
            },
            {
                title: 'Contract End',
                orderProperties: ['currentContract.endDate']
            },
            {
                title: 'CON',
                description: 'Condition',
                orderProperties: ['condition']
            },
            {
                title: 'S',
                description: 'For Sale',
                orderProperties: ['forSale']
            }
        ]
    };

    return class PlayersTable {
        constructor(players, container, ...classList) {
            this.players = players;
            this.container = container;
            this._classList = classList.concat(['players', 'sortable']);

            this._tableOrder = {
                properties: _HEADER.items[0].orderProperties,
                direction: 1
            };

            this.invisibleColumns = [];
            this.pageSize = 50;
            this._visiblePlayersCount = 0;
        }

        get _sortedPlayers() {
            let players = this.players.orderBy(...this._tableOrder.properties);

            if (this._tableOrder.direction === -1)
                players = players.reverse();

            return players;
        }

        get _visiblePlayers() {
            return this._sortedPlayers.slice(0, this._visiblePlayersCount);
        }

        get _invisiblePlayersCount() {
            return this.players.length - this._visiblePlayersCount;
        }

        get _nextPlayers() {
            let count = Math.min(this._invisiblePlayersCount, this.pageSize);
            let players = this._sortedPlayers.slice(this._visiblePlayersCount, this._visiblePlayersCount + count);
            this._visiblePlayersCount += count;
            return players;
        }

        get info() {
            return `Showing ${this._visiblePlayersCount.toLocaleString()} of ${this.players.length.toLocaleString()}`;
        }

        build() {
            this.destroy();

            this.table = Html.createTable(null, _HEADER.items.map(item => item.title), ...this._classList.concat('table-hover'));
            this.pInfo = Html.createParagraph('');
            this.buttonLoadMore = Html.createButton('Load more', 'btn-primary', 'mb-3');

            this._configTable();
            this._configInfo();
            this._configLoadMore();
        }

        loadMore() {
            this._fillBody(this._nextPlayers);
        }

        destroy() {
            $('[data-toggle="tooltip"]').tooltip('dispose');
            Html.clearElement(this.container);
            this._visiblePlayersCount = 0;
        }

        _configTable() {
            this._configHeader();
            this._fillBody(this._nextPlayers);
            this.container.appendChild(this.table);
        }

        _configHeader() {
            let tr = this.table.querySelector('thead tr');

            _HEADER.items.forEach((item, index) => {
                if (item.description)
                    Html.setTooltip(tr.children[index], item.description);

                tr.children[index].addEventListener('click', this._updateOrder.bind(this, item.orderProperties));
            });
        }

        _updateOrder(orderProperties) {
            orderProperties = orderProperties.concat(_HEADER.items[0].orderProperties);

            this._tableOrder.direction = (JSON.stringify(orderProperties) === JSON.stringify(this._tableOrder.properties)) ? this._tableOrder.direction * -1 : 1;

            if (!orderProperties)
                orderProperties = this._tableOrder.properties;

            this._tableOrder.properties = orderProperties;

            Html.clearElement(this.table.querySelector('tbody'));
            this._fillBody(this._visiblePlayers);
        }

        _fillBody(players) {
            let tbody = this.table.querySelector('tbody');

            players.forEach(player => {
                let tr = tbody.insertRow();

                Html.insertCell(tr, player.position.abbreviation, 'text-center');
                Html.insertCell(tr, player.country.abbreviation, 'text-center');
                Html.insertCell(tr, player.completeName);
                Html.insertCell(tr, player.overall, 'text-center');
                Html.insertCell(tr, player.side, 'text-center');
                Html.insertCell(tr, player.energy.value);
                Html.insertCell(tr, player.club.name);
                Html.insertCell(tr, player.wage.toLocaleString(), 'text-right');
                Html.insertCell(tr, player.marketValue.toLocaleString(), 'text-right');
                Html.insertCell(tr, player.age, 'text-center');
                Html.insertCell(tr, player.currentContract.endDate.toLocaleDateString(), 'text-center');
                Html.insertCell(tr, player.condition, 'text-center');
                Html.insertCell(tr, player.forSale, 'text-center');

                this._formatPosition(tr.children[0], player.position);
                this._formatCountry(tr.children[1], player.country);
                this._formatName(tr.children[2], player);
                this._formatOverall(tr.children[3], player);
                this._formatSide(tr.children[4], player);
                this._formatEnergy(tr.children[5], player.energy);
                this._formatAge(tr.children[9], player.age);
                this._formatContract(tr.children[10], player.currentContract);
                this._formatCondition(tr.children[11], player.condition);
                this._formatForSale(tr.children[12], player.forSale);
            });

            this._optimizeTableForMobile();
            this.invisibleColumns.forEach(c => Html.hideColumn(this.table, c));
            setTimeout(() => $('[data-toggle="tooltip"]').tooltip(), 0);

            this.pInfo.innerText = this.info;
            this.buttonLoadMore.disabled = this._visiblePlayersCount === this.players.length;
        }

        _formatPosition(td, position) {
            td.classList.add('font-weight-bold', `text-${position.fieldRegion.color.class}`, 'border', `border-left-${position.fieldRegion.name}`);
            td.setAttribute('title', position.name);
        }

        _formatCountry(td, country) {
            let flag = Html.createImage(country.flag, country.name, 'img-miniature', 'border');
            td.classList.add('pr-0');
            td.innerHTML = flag.outerHTML;
        }

        _formatName(td, player) {
            let link = Html.createLinkForModal('player-modal', player.completeName, 'player', 'text-dark');
            link.setAttribute('data-player-id', player.id);
            td.innerHTML = link.outerHTML;
        }

        _formatOverall(td, player) {
            Html.clearElement(td);
            let span = Html.createElement('span', player.overall, `bg-${player.category}`, 'overall', 'mx-auto');

            if (player.star) {
                let icon = Html.createIcon('star', YELLOW);
                Html.setTooltip(span, icon.outerHTML, 'left');
                span.classList.add('player-star');
            }

            td.classList.add('pl-0', 'pr-0');
            td.appendChild(span);
        }

        _formatSide(td, player) {
            td.setAttribute('title', player.sideDescription);
        }

        _formatEnergy(td, energy) {
            td.innerText = '';
            let divProgress = Html.createProgressBar(energy.value, `bg-${energy.color.class}`);
            td.appendChild(divProgress);
        }

        _formatAge(td, age) {
            td.classList.add(`text-${(age >= 32 ? 'danger' : 'primary')}`);
        }

        _formatContract(td, contract) {
            if (contract.remainingMonths < 3)
                td.classList.add('text-danger');
        }

        _formatCondition(td, condition) {
            Html.formatCellPlayerCondition(td, condition);
        }

        _formatForSale(td, forSale) {
            td.innerText = '';
            if (forSale) {
                let icon = Html.createIcon('check-circle', BLUE, 'fa-lg');
                td.appendChild(icon);
            }
        }

        _optimizeTableForMobile() {
            Array.from(this.table.children).filter(section => section != null).forEach(section => {
                Array.from(section.children).forEach(row => {
                    Array.from(row.children).forEach((cell, index) => {
                        if (index > 4)
                            cell.classList.add('d-none', 'd-sm-table-cell');
                    });
                });
            });
        }

        _configInfo() {
            this.container.appendChild(this.pInfo);
        }

        _configLoadMore() {
            this.container.appendChild(this.buttonLoadMore);
            this.buttonLoadMore.addEventListener('click', this.loadMore.bind(this));
        }
    }
})();