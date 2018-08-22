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
}