class GameService {
    save(gameName) {
        let promises = [];

        return ConnectionFactory
            .getConnection(gameName)
            .then(connection => new GenericDAO(connection))
            .then(dao => Entity.children().forEach(_class => promises.push(dao.updateList(_class.all()))))
            .then(() => Promise.all(promises))
            .catch(error => { throw error; });
    }

    load(gameName) {
        let promises = [];
        let objectStoreNames = [];

        return ConnectionFactory
            .getConnection(gameName)
            .then(connection => {
                for (let i = 0; i < connection.objectStoreNames.length; i++)
                    objectStoreNames.push(connection.objectStoreNames[i]);
                return new GenericDAO(connection);
            })
            .then(dao => objectStoreNames.forEach(name => promises.push(dao.getAll(name))))
            .then(() => Promise.all(promises))
            .then(results => objectStoreNames.map(name => eval(name)).forEach((_class, index) => results[index].forEach(object => _class.load(object))))
            .catch(error => { throw error });
    }

    info(gameName) {
        let dao = null;
        let game = null;
        let info = { game: gameName, clubName: null, seasonYear: null };

        return ConnectionFactory
            .getConnection(gameName)
            .then(connection => dao = new GenericDAO(connection))
            .then(() => dao.getById('Game', 1))
            .then(object => game = object)
            .then(() => dao.getById('Club', game._clubId))
            .then(club => info.clubName = club.name)
            .then(() => dao.getById('Season', game._seasonIds.last()))
            .then(season => info.seasonYear = season.year)
            .then(() => info)
            .catch(error => { throw error });
    }

    delete(gameName) {
        return ConnectionFactory
            .dropDatabase(gameName)
            .catch(error => { throw error });
    }
}