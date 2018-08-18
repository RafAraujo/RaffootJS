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
                .transaction([entity.store], 'readwrite')
                .objectStore(entity.store)
                .put(entity);

            request.onsuccess = () => resolve(entity);

            request.onerror = error => reject(error);
        });
    }

    select(entityClass) {
        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([entityClass.name], 'readwrite')
                .objectStore(entityClass.name)
                .openCursor();

            cursor.onsuccess = e => {

                let current = e.target.result;

                if (current) {
                    let object = current.value;
                    entityClass.load(object);
                    current.continue();
                }
                else {
                    resolve(entityClass.all());
                }
            };

            cursor.onerror = error => reject(error);
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