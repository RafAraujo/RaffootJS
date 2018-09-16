

class GameService {
    async createAsync(gameName) {
        try {
            let connection = await ConnectionFactory.getConnection(gameName, true);
            let dao = new GenericDAO(connection);
            await dao.addAll(Entity.stores(), Entity.all());
            ConnectionFactory.closeConnection();
        }
        catch (error) {
            throw error;
        }
    }

    async loadAsync(gameName) {
        try {
            let connection = await ConnectionFactory.getConnection(gameName);
            let objectStoreNames = Array.from(connection.objectStoreNames);
            let dao = new GenericDAO(connection);
            let promises = objectStoreNames.map(async name => await dao.getAll(name));
            let results = await Promise.all(promises);
            objectStoreNames.map(name => eval(name)).forEach((_class, index) => _class.load(results[index]));
            ConnectionFactory.closeConnection();
            return Game.current();
        }
        catch (error) {
            throw error;
        }
    }

    async getInfoAsync(gameName) {
        let info = { name: gameName, clubName: '', seasonYear: '' };

        if (gameName === '')
            return Promise.resolve(info);

        try {
            let connection = await ConnectionFactory.getConnection(gameName);
            let dao = new GenericDAO(connection);
            let game = await dao.getById('Game', 1);
            let club = await dao.getById('Club', game._clubId);
            info.clubName = club.name;
            let season = await dao.getById('Season', game._seasonIds.last());
            info.seasonYear = season.year;
            ConnectionFactory.closeConnection();
            return info;
        }
        catch (erorr) {
            throw error;
        }
    }

    async deleteAsync(gameName) {
        try {
            await ConnectionFactory.dropDatabase(gameName);
        }
        catch (error) {
            throw error;
        }
    }
}
