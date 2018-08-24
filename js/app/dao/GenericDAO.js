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

    update(entity) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([entity.store], IDBTransaction.READ_WRITE)
                .objectStore(entity.store)
                .put(entity);

            request.onsuccess = () => resolve(entity);

            request.onerror = error => reject(error);
        });
    }

    updateList(entities) {
        return new Promise((resolve, reject) => {

            let objectStore = this._connection
                .transaction([entities[0].store], IDBTransaction.READ_WRITE)
                .objectStore(entities[0].store)
            
            for (let entity of entities) {
                let request = objectStore.put(entity);

                request.onsuccess = () => resolve(entity);

                request.onerror = error => reject(error);
            }
        });
    }

    getAll(store) {
        return new Promise((resolve, reject) => {

            let getAll = this._connection
                .transaction([store], IDBTransaction.READ_ONLY)
                .objectStore(store)
                .getAll();
            
            getAll.onsuccess = e => resolve(e.target.result);

            getAll.onerror = error => reject(error);
        });
    }

    getById(store, id) {
        return new Promise((resolve, reject) => {
            let getById = this._connection
                .transaction([store], IDBTransaction.READ_ONLY)
                .objectStore(store)
                .get(id);
            
            getById.onsuccess = e => resolve(e.target.result);

            getById.onerror = error => reject(error);
        });
    }

    delete(entity) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([entity.store], IDBTransaction.READ_WRITE)
                .objectStore(entity.store)
                .delete(entity.id);

            request.onsuccess = () => resolve();

            request.onerror = error => reject(error); 
        });

    }
}