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
                title: 'OVA',
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
                title: 'Skills',
                orderProperties: ['skillsDescription']
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
            },
            {
                title: 'L',
                description: 'For Loan',
                orderProperties: ['forLoan']
            }
        ]
    };

    return class PlayersTable {
        constructor(players, container, ...classList) {
            this._players = players;
            this._container = container;
            this._classList = classList.concat(['sortable']);

            this._tableOrder = {
                properties: _HEADER.items[0].orderProperties,
                direction: 1
            };

            this._invisibleColumns = [];
            this._visiblePlayersCount = 0;
            this._pageSize = 50;
            this._showInfo = true;
            this._showLoadMore = true;
        }

        set players(value) {
            this._players = value;
        }

        set invisibleColumns(value) {
            this._invisibleColumns = value.map(column => this._getColumnIndexByDescription(column));
        }

        set pageSize(value) {
            this._pageSize = value;
        }

        set showInfo(value) {
            this._showInfo = value;
        }

        set showLoadMore(value) {
            this._showLoadMore = value;
        }

        get _sortedPlayers() {
            let players = this._players.orderBy(...this._tableOrder.properties);

            if (this._tableOrder.direction === -1)
                players = players.reverse();

            return players;
        }

        get _visiblePlayers() {
            return this._sortedPlayers.slice(0, this._visiblePlayersCount);
        }

        get _invisiblePlayersCount() {
            return this._players.length - this._visiblePlayersCount;
        }

        get _nextPlayers() {
            let count = Math.min(this._invisiblePlayersCount, this._pageSize);
            let players = this._sortedPlayers.slice(this._visiblePlayersCount, this._visiblePlayersCount + count);
            this._visiblePlayersCount += count;
            return players;
        }

        get _info() {
            return `Showing ${this._visiblePlayersCount.toLocaleString()} of ${this._players.length.toLocaleString()}`;
        }

        build() {
            this.destroy();

            this._table = HtmlHelper.createTable(null, _HEADER.items.map(item => item.title), ...this._classList);
            this._pInfo = HtmlHelper.createParagraph('');
            this._buttonLoadMore = HtmlHelper.createButton('Load more', 'btn-primary', 'mb-3');

            this._configHeader();
            this._fillBody(this._nextPlayers);

            this._container.appendChild(this._table);
            this._container.appendChild(this._pInfo);
            this._configLoadMore();

            this._showInfo ? HtmlHelper.show(this._pInfo) : HtmlHelper.hide(this._pInfo);
            this._showLoadMore ? HtmlHelper.show(this._buttonLoadMore) : HtmlHelper.hide(this._buttonLoadMore);
        }

        loadMore() {
            this._fillBody(this._nextPlayers);
        }

        destroy() {
            $('[data-toggle="tooltip"]:not(.d-none)').tooltip('dispose');
            HtmlHelper.clearElement(this._container);
            this._visiblePlayersCount = 0;
        }

        _updateOrder(orderProperties) {
            orderProperties = orderProperties.concat(_HEADER.items[0].orderProperties);

            this._tableOrder.direction = (JSON.stringify(orderProperties) === JSON.stringify(this._tableOrder.properties)) ? this._tableOrder.direction * -1 : 1;

            if (!orderProperties)
                orderProperties = this._tableOrder.properties;

            this._tableOrder.properties = orderProperties;

            HtmlHelper.clearElement(this._table.querySelector('tbody'));
            this._fillBody(this._visiblePlayers);
        }

        _getColumnIndexByDescription(description) {
            let index = _HEADER.items.map(i => i.description).indexOf(description);
            if (index === -1)
                index = _HEADER.items.map(i => i.title).indexOf(description);
            return index;
        }

        _configHeader() {
            let tr = this._table.querySelector('thead tr');

            _HEADER.items.forEach((item, index) => {
                if (item.description)
                    HtmlHelper.setTooltip(tr.children[index], item.description);

                tr.children[index].addEventListener('click', this._updateOrder.bind(this, item.orderProperties));
            });
        }

        _fillBody(players) {
            let tbody = this._table.querySelector('tbody');

            players.forEach(player => {
                let tr = tbody.insertRow();

                HtmlHelper.insertCell(tr, player.position.abbreviation, 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, player.country.abbreviation, 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, player.completeName, 'align-middle');
                HtmlHelper.insertCell(tr, player.overall, 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, player.side, 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, player.energy, 'align-middle');
                HtmlHelper.insertCell(tr, player.club.name, 'align-middle');
                HtmlHelper.insertCell(tr, player.wage.toLocaleString(), 'align-middle', 'text-right');
                HtmlHelper.insertCell(tr, player.marketValue.toLocaleString(), 'align-middle', 'text-right');
                HtmlHelper.insertCellWithTooltip(tr, player.skillsAbbreviatedDescription, player.skillsDescription.split('/').join('<br>'), 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, player.age, 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, player.currentContract.endDate.toLocaleDateString(), 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, player.condition, 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, player.forSale, 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, player.forLoan, 'align-middle', 'text-center');

                this._formatPosition(tr.children[0], player.position);
                this._formatCountry(tr.children[1], player.country);
                this._formatName(tr.children[2], player);
                this._formatOverall(tr.children[3], player);
                this._formatSide(tr.children[4], player);
                this._formatEnergy(tr.children[5], player.energy);
                this._formatAge(tr.children[10], player.age);
                this._formatContract(tr.children[11], player.currentContract);
                this._formatCondition(tr.children[12], player.condition);
                this._formatForSale(tr.children[13], player.forSale);
                this._formatForLoan(tr.children[14], player.forLoan);
            });

            this._invisibleColumns.forEach(index => HtmlHelper.hideColumn(this._table, index));
            this._pInfo.innerText = this._info;
            this._buttonLoadMore.disabled = this._visiblePlayersCount === this._players.length;

            setTimeout(() => $('[data-toggle="tooltip"]:not(.d-none)').tooltip(), 0);
        }

        _formatPosition(td, position) {
            td.classList.add('font-weight-bold', `text-${position.fieldRegion.color}`, 'border', `border-left-${position.fieldRegion.name}`);
            td.setAttribute('title', position.name);
        }

        _formatCountry(td, country) {
            let flag = HtmlHelper.createImage(country.flag, country.name, 'img-miniature', 'border');
            td.innerHTML = flag.outerHTML;
            if (screen.width <= 480) {
                td.style.padding = '0';
                td.style.paddingLeft = '0.5rem';
            }
        }

        _formatName(td, player) {
            let link = HtmlHelper.createLinkForModal('player-modal', player.completeName, 'player', 'text-dark');
            link.setAttribute('data-player-id', player.id);
            td.innerHTML = link.outerHTML;
        }

        _formatOverall(td, player) {
            td.classList.add('border', `bg-${player.category}`);

            if (player.star) {
                let icon = HtmlHelper.createIcon('star', YELLOW);
                HtmlHelper.setTooltip(td, icon.outerHTML, 'left');
                td.classList.add('player-star');
            }
        }

        _formatSide(td, player) {
            td.setAttribute('title', player.sideDescription);
        }

        _formatEnergy(td, energy) {
            td.innerText = '';
            let backgroundClass = `bg-${(energy >= 70 ? 'success' : energy >= 50 ? 'warning' : 'danger')}`;
            let divProgress = HtmlHelper.createProgressBar(energy, backgroundClass);
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
            let icon = null;
            let tooltipIcon = null;

            switch (condition) {
                case 1:
                    icon = HtmlHelper.createIcon('angle-double-down', PURPLE, 'fa-lg');
                    tooltipIcon = HtmlHelper.createIcon('tired', 'gold', 'fa-2x');
                    break;
                case 2:
                    icon = HtmlHelper.createIcon('angle-down', BLUE, 'fa-lg');
                    tooltipIcon = HtmlHelper.createIcon('frown', 'gold', 'fa-2x');
                    break;
                case 3:
                    icon = HtmlHelper.createIcon('angle-right', GREEN, 'fa-lg');
                    tooltipIcon = HtmlHelper.createIcon('meh-blank', 'gold', 'fa-2x');
                    break;
                case 4:
                    icon = HtmlHelper.createIcon('angle-up', ORANGE, 'fa-lg');
                    tooltipIcon = HtmlHelper.createIcon('smile', 'gold', 'fa-2x');
                    break;
                case 5:
                    icon = HtmlHelper.createIcon('angle-double-up', RED, 'fa-lg');
                    tooltipIcon = HtmlHelper.createIcon('grin-squint', 'gold', 'fa-2x');
                    break;
            }

            td.innerText = '';
            td.appendChild(icon);
            HtmlHelper.setTooltip(td, tooltipIcon.outerHTML, 'right', 'fa-lg');
        }

        _formatForSale(td, forSale) {
            td.innerText = '';
            if (forSale) {
                let icon = HtmlHelper.createIcon('check-circle', BLUE, 'fa-lg');
                td.appendChild(icon);
            }
        }

        _formatForLoan(td, forLoan) {
            td.innerText = '';
            if (forLoan) {
                let icon = HtmlHelper.createIcon('check-circle', BLUE, 'fa-lg');
                td.appendChild(icon);
            }
        }

        _configLoadMore() {
            this._container.appendChild(this._buttonLoadMore);
            this._buttonLoadMore.addEventListener('click', this.loadMore.bind(this));
        }
    }
})();