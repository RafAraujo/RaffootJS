//https://stackoverflow.com/questions/10484965/how-can-i-put-several-requests-in-one-transaction-in-indexeddb
//https://stackoverflow.com/questions/33594790/indexeddb-and-large-amount-of-inserts-on-angular-app

class GameService {
    create(gameName) {
        return ConnectionFactory
            .getConnection(gameName, true)
            .then(connection => new GenericDAO(connection))
            .then(dao => dao.addAll(Entity.children().map(e => e.name), Entity.all()))
            .then(() => ConnectionFactory.closeConnection())
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
            .then(() => ConnectionFactory.closeConnection())
            .then(() => Game.all()[0])
            .catch(error => { throw error });
    }

    info(gameName) {
        let dao = null;
        let game = null;
        let info = { name: gameName, clubName: '', seasonYear: '' };

        if (gameName === '')
            return Promise.resolve(info);

        return ConnectionFactory
            .getConnection(gameName)
            .then(connection => dao = new GenericDAO(connection))
            .then(() => dao.getById('Game', 1))
            .then(object => game = object)
            .then(() => dao.getById('Club', game._clubId))
            .then(club => info.clubName = club.name)
            .then(() => dao.getById('Season', game._seasonIds.last()))
            .then(season => info.seasonYear = season.year)
            .then(() => {
                ConnectionFactory.closeConnection();
                return info;
            })
            .catch(error => { throw error });
    }

    delete(gameName) {
        return ConnectionFactory
            .dropDatabase(gameName)
            .catch(error => { throw error });
    }
}
