

class GameService {
    async createAsync(gameName) {
        try {
            let connection = await ConnectionFactory.getConnection(gameName, true);
            let dao = new GenericDAO(connection);
            await dao.addMany(Entity.all());
            ConnectionFactory.closeConnection();
        }
        catch (error) {
            throw error;
        }
    }

    async saveAsync(game) {
        try {
            let connection = await ConnectionFactory.getConnection(game.name, true);
            let dao = new GenericDAO(connection);

            let entities = [];
            
            entities = entities.concat(game.currentMatches);

            let matchClubs = game.currentMatches.map(m => m.matchClubs).reduce((result, array) => result.concat(array));
            entities = entities.concat(matchClubs);

            let championshipEditionClubs = game.currentMatches.map(m => m.championshipEdition).distinct().map(ce => ce.championshipEditionClubs).reduce((result, array) => result.concat(array));
            entities = entities.concat(championshipEditionClubs);
            
            let clubs = game.currentMatches.map(m => m.clubs).reduce((result, array) => result.concat(array));
            entities = entities.concat(clubs);
            entities = entities.concat(clubs.map(c => c.squad));
            
            let squadPlayers = clubs.map(c => c.squad.squadPlayers).reduce((result, array) => result.concat(array));
            entities = entities.concat(squadPlayers);
            entities = entities.concat(squadPlayers.map(sp => sp.player));
            entities = entities.concat(squadPlayers.map(sp => sp.player.contract));

            await dao.updateMany(entities);
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
        catch (error) {
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
