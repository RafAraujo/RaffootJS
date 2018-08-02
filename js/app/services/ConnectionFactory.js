let ConnectionFactory = (function () {
    let connection = null;
    let close = null;

    return class ConnectionFactory {
        constructor() {
            throw new Error('ConnectionFactory.constructor');
        }

        static getConnection(dbName) {
            
            return new Promise((resolve, reject) => {
            
                let openRequest = window.indexedDB.open(/*`Raffoot ${VERSION} - ` + */dbName, VERSION);

                openRequest.onupgradeneeded = e => ConnectionFactory._createStores(e.target.result);

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

        static _createStores(connection) {
            let stores = Entity.stores;

            stores.forEach(store => {
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