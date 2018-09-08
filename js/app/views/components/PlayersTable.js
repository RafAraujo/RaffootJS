let PlayersTable = (function () {
    const HEADER = {
        items: [
            {
                title: 'Id',
            },
            {
                title: 'POS',
                description: 'Position',
                orderProperties: ['position.line', 'position.abbreviation']
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
                title: 'Club',
                orderProperties: ['club.name']
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
            }
        ]
    }

    return class PlayersTable {
        constructor(players) {
            this._players = players;

            this._tableOrder = {
                properties: HEADER.items[1].orderProperties,
                direction: 1
            };

            this._invisibleColumns = [];
            this._container = null;
        }

        _getSortedPlayers() {
            let players = this._players.orderBy(...this._tableOrder.properties);

            if (this._tableOrder.direction === -1)
                players = players.reverse();

            return players;
        }

        setInvisibleColumns(invisibleColumns) {
            this._invisibleColumns = invisibleColumns;
        }

        build(container, ...classList) {
            this._container = container;
            HtmlHelper.clearElement(this._container);

            this._table = HtmlHelper.createTable(null, HEADER.items.map(item => item.title));
            this._table.classList.add('sortable');

            this._configHeader(this._table.children[0]);
            this._fillBody(this._table.children[1]);

            this._invisibleColumns.forEach(index => HtmlHelper.hideColumn(this._table, index));
            this._table.classList.add(...classList);

            container.appendChild(this._table);

            $('[data-toggle="tooltip"]:not(.d-none)').tooltip();
        }

        _configHeader(thead) {
            let tr = thead.children[0];

            tr.children[0].classList.add('d-none');

            HEADER.items.forEach((item, index) => {
                if (item.description)
                    HtmlHelper.setTooltip(tr.children[index], item.description);

                tr.children[index].addEventListener('click', this._sort.bind(this, item.orderProperties));
            });
        }

        _fillBody(tbody) {
            HtmlHelper.clearElement(tbody);

            let players = this._getSortedPlayers();

            players.forEach(player => {
                let tr = tbody.insertRow();

                HtmlHelper.insertCell(tr, player.id, 'd-none', 'align-middle');
                HtmlHelper.insertCell(tr, player.position.abbreviation, 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, '', 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, player.completeName, 'align-middle');
                HtmlHelper.insertCell(tr, player.club.name, 'align-middle');
                HtmlHelper.insertCell(tr, player.overall, 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, player.side, 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, '', 'align-middle');
                HtmlHelper.insertCell(tr, player.wage.toLocaleString(), 'align-middle', 'text-right');
                HtmlHelper.insertCell(tr, player.marketValue.toLocaleString(), 'align-middle', 'text-right');
                HtmlHelper.insertCellWithTooltip(tr, player.skillsAbbreviatedDescription, player.skillsDescription.split('/').join('<br>'), 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, player.age, 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, player.currentContract.endDate.toLocaleDateString(), 'align-middle', 'text-center');
                HtmlHelper.insertCell(tr, '', 'align-middle', 'text-center');

                this._formatPosition(tr.children[1], player.position);
                this._formatCountry(tr.children[2], player.country);
                this._formatOverall(tr.children[5], player);
                this._formatSide(tr.children[6], player);
                this._formatEnergy(tr.children[7], player.energy);
                this._formatAge(tr.children[11], player.age);
                this._formatContract(tr.children[12], player.currentContract);
                this._formatCondition(tr.children[13], player.condition);
            });
        }

        _formatPosition(td, position) {
            td.classList.add('font-weight-bold', `text-${position.fieldRegion.color}`, 'border', `border-left-${position.fieldRegion.name}`);
            td.setAttribute('title', position.name);
        }

        _formatCountry(td, country) {
            let flag = HtmlHelper.createImage(country.flag, country.name, 'img-miniature', 'border');
            td.innerHTML = flag.outerHTML;
        }

        _formatOverall(td, player) {
            td.classList.add('border', `bg-${player.category}`);

            if (player.star) {
                let icon = HtmlHelper.createIcon('star', YELLOW);
                HtmlHelper.setTooltip(td, icon.outerHTML, 'left');
                td.classList.add('td-player-star');
            }
        }

        _formatSide(td, player) {
            td.setAttribute('title', player.sideDescription);
        }

        _formatEnergy(td, energy) {
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

            td.appendChild(icon);
            HtmlHelper.setTooltip(td, tooltipIcon.outerHTML, 'right', 'fa-lg');
        }

        _sort(orderProperties) {
            this._tableOrder.direction = (JSON.stringify(orderProperties) === JSON.stringify(this._tableOrder.properties)) ? this._tableOrder.direction * -1 : 1;

            if (!orderProperties)
                orderProperties = this._tableOrder.properties;

            this._tableOrder.properties = orderProperties;

            this.build(this._container);
        }
    }
})();