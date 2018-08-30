class HomeController {
    constructor() {
        this._service = new GameService();
        this._loadGame()
            .then(game => {
                this._game = game;
                this._view = new HomeView(this._game);
                this._view.update(this._section);
            })
            .catch(error => { throw error });
    }

    get _queryString() {
        return window.location.search;
    }

    get _gameName() {
        let queryString = window.location.search;
        return queryString.substring(queryString.indexOf('=') + 1);
    }

    get _defaultSection() {
        return 'squad';
    }

    get _section() {
        let url = document.URL;
        return url.includes('#') ? url.substring(url.indexOf('#') + 1) : this._defaultSection;
    }

    _loadGame() {
        let t0 = performance.now();

        return this._service
            .load(this._gameName)
            .then(game => {
                let t1 = performance.now();
                console.log("Call took " + (t1 - t0) + " milliseconds.");
                return game;
            })
            .catch(error => { throw error });
    }

    sort(table, columnIndex) {
        let players = this._game.club.squad.players.orderBy(...sortCriteria(sortColumn));
        if (this._squadSortColumn === sortColumn)
            players = players.reverse();

        function sortCriteria(column) {
            switch (column)
            {
                case 'position':
                    return ['position.line', 'position.abbreviation', '-overall'];
                case 'skills':
                    return ['skillsDescription'];
                default:
                    return [column];
            }
        }
    }
}