class GameService {
    save(game) {
        return ConnectionFactory
            .getConnection(game.name)
            .then(connection => new GenericDAO(connection))
            .then(dao => dao.update(game))
            .then(() => game)
            .catch(error => { throw error; });
    };

    load(gameName) {
        return ConnectionFactory
            .getConnection(gameName)
            .then(connection => new GenericDAO(connection))
            .then(dao => dao.select(Game))
            .then(() => Game.all()[0])
            .catch(error => { throw error });
    }
}