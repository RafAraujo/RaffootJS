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
        return ConnectionFactory
            .getConnection(gameName)
            .then(connection => new GenericDAO(connection))
            .then(dao => dao.select(Game))
            .then(() => Game.all()[0])
            .catch(error => { throw error });
    }
}