let ConnectionFactory = (function () {
    const _DATABASES = 'RaffootDatabases';

    let connection = null;
    let close = null;

    return class ConnectionFactory {
        constructor() {
            throw new Error('ConnectionFactory.constructor');
        }

        static _addDatabaseName(dbName) {
            let databases = ConnectionFactory.getDatabases();
            databases.push(dbName);
            localStorage.setItem(_DATABASES, JSON.stringify(databases));
            return ConnectionFactory.getDatabases();
        }

        static _removeDatabaseName(dbName) {
            let databases = ConnectionFactory.getDatabases();
            databases.remove(dbName);
            localStorage.setItem(_DATABASES, JSON.stringify(databases));
            return ConnectionFactory.getDatabases();
        }

        static getDatabases() {
            return JSON.parse(localStorage.getItem(_DATABASES)) || [];
        }

        static getConnection(dbName, createIfNotExists = false) {

            return new Promise((resolve, reject) => {

                let request = indexedDB.open(dbName, VERSION);

                request.onupgradeneeded = e => {
                    if (createIfNotExists) {
                        ConnectionFactory._createStores(e.target.result);
                        ConnectionFactory._addDatabaseName(dbName);
                    }
                    else
                        e.target.transaction.abort();
                };

                request.onsuccess = e => {
                    if (!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = () => { throw new Error('ConnectionFactory.getConnection(dbName).close()'); };
                    }
                    resolve(connection);
                };

                request.onerror = e => reject(e.target.error);
            });
        }

        static dropDatabase(dbName) {
            return new Promise((resolve, reject) => {
                let request = indexedDB.deleteDatabase(dbName);

                request.onsuccess = e => {
                    ConnectionFactory._removeDatabaseName(dbName);
                    resolve(e.target.result);
                };

                request.onerror = e => reject(e.target.error);
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