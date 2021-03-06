class GenericDAO {
    constructor(connection) {
        this._connection = connection;
    }

    insert(entity) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([entity.store], 'readwrite')
                .objectStore(entity.store)
                .add(entity);

            request.onsuccess = () => resolve(entity);

            request.onerror = error => reject(error);
        });
    }

    addMany(entities) {
        return new Promise((resolve, reject) => {

            let transaction = this._connection.transaction(entities.map(e => e.store).distinct(), 'readwrite')
            
            transaction.oncomplete = () => resolve(entities);
            transaction.onerror = error => reject(error);

            entities.forEach(e => transaction.objectStore(e.store).add(e));
        });
    }

    update(entity) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([entity.store], 'readwrite')
                .objectStore(entity.store)
                .put(entity);

            request.onsuccess = () => resolve(entity);

            request.onerror = error => reject(error);
        });
    }

    
    updateMany(entities) {
        return new Promise((resolve, reject) => {

            let transaction = this._connection.transaction(entities.map(e => e.store).distinct(), 'readwrite')
            
            transaction.oncomplete = () => resolve(entities);
            transaction.onerror = error => reject(error);

            entities.forEach(e => transaction.objectStore(e.store).put(e, e.id));
        });
    }

    getAll(store) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([store], 'readonly')
                .objectStore(store)
                .getAll();
            
            request.onsuccess = e => resolve(e.target.result);

            request.onerror = error => reject(error);
        });
    }

    getById(store, id) {
        return new Promise((resolve, reject) => {
            let getById = this._connection
                .transaction([store], 'readonly')
                .objectStore(store)
                .get(id);
            
            getById.onsuccess = e => resolve(e.target.result);

            getById.onerror = error => reject(error);
        });
    }

    delete(entity) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([entity.store], 'readwrite')
                .objectStore(entity.store)
                .delete(entity.id);

            request.onsuccess = () => resolve();

            request.onerror = error => reject(error); 
        });

    }
}