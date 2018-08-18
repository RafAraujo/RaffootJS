class GameService {
    save(game) {
        return ConnectionFactory
            .getConnection(game.name)
            .then(connection => new GenericDAO(connection))
            .then(dao => dao.update(game))
            .then(() => game)
            .catch(error => { throw error; });
    };
}