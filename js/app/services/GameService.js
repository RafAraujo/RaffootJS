class GameService {
    save(game) {
        let promises = [];

        return ConnectionFactory
            .getConnection(game.name)
            .then(connection => new GenericDAO(connection))
            .then(dao => Entity.children().forEach(_class => promises.push(dao.updateList(_class.all()))))
            .then(() => Promise.all(promises))
            .then(() => game)
            .catch(error => { throw error; });
    }

    load(gameName) {
        let promises = [];
        let objectStoreNames = null;

        return ConnectionFactory
            .getConnection(gameName)
            .then(connection => {
                objectStoreNames = connection.objectStoreNames;
                return new GenericDAO(connection);
            })
            .then(dao => {
                for (let i = 0; i < objectStoreNames.length; i++)
                    promises.push(dao.select(eval(objectStoreNames[i])));
            })
            .then(() => Promise.all(promises))
            .then(() => Game.all()[0])
            .catch(error => { throw error });
    }
}