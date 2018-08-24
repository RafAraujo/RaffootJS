let ConnectionFactory = (function () {
    const RAFFOOT_DATABASES = 'RaffootDatabases';

    let connection = null;
    let close = null;

    return class ConnectionFactory {
        constructor() {
            throw new Error('ConnectionFactory.constructor');
        }

        static _addDatabaseName(dbName) {
            let databases = ConnectionFactory.getDatabases();
            databases.push(dbName);
            window.localStorage.setItem(RAFFOOT_DATABASES, JSON.stringify(databases));
            return ConnectionFactory.getDatabases();
        }

        static _removeDatabaseName(dbName) {
            let databases = ConnectionFactory.getDatabases();
            databases.remove(dbName);
            window.localStorage.setItem(RAFFOOT_DATABASES, JSON.stringify(databases));
            return ConnectionFactory.getDatabases();
        }

        static getDatabases() {
            return JSON.parse(window.localStorage.getItem(RAFFOOT_DATABASES)) || [];
        }

        static getConnection(dbName) {
            
            return new Promise((resolve, reject) => {
            
                let openRequest = window.indexedDB.open(dbName, VERSION);

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                    ConnectionFactory._addDatabaseName(dbName);
                };

                openRequest.onsuccess = e => {
                    if (!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = () => { throw new Error('ConnectionFactory.getConnection(dbName).close()'); };
                    }
                    resolve(connection);
                };

                openRequest.onerror = e => reject(e.target.error);
            });
        }

        static dropDatabase(dbName) {
            return new Promise((resolve, reject) => {
                let dropRequest = window.indexedDB.deleteDatabase(dbName);

                dropRequest.onsuccess = e => {
                    ConnectionFactory._removeDatabaseName(dbName);
                    resolve(e.target.result);
                };

                dropRequest.onerror = e => reject(e.target.error);
            });
        }

        static _createStores(connection) {
            Entity.stores().orderBy('name').forEach(store => {
                if (connection.objectStoreNames.contains(store))
                    connection.deleteObjectStore(store);
                connection.createObjectStore(store, { autoIncrement: true });
            });
        }

        static closeConnection() {
            if (connection) {
                close();
                connection = null;
                close = null;
            }
        }
    }
})();