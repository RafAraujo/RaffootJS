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
                .transaction([this._entity.store], 'readwrite')
                .entityStore(this._entity.store)
                .put(entity);

            request.onsuccess = () => resolve(entity);

            request.onerror = error => reject(error);
        });
    }

    select() {
        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._entity.store], 'readwrite')
                .entityStore(this._entity.store)
                .openCursor();

            let list = [];

            cursor.onsuccess = e => {

                let current = e.target.result;

                if (current) {
                    let save = current.value;
                    list.push(this._entity.load(save));
                    current.continue();
                }
                else {
                    resolve(list);
                }
            };

            cursor.onerror = error => reject(error);
        });
    }

    delete(entity) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._entity.store], 'readwrite')
                .entityStore(this._entity.store)
                .delete(entity.id);

            request.onsuccess = () => resolve();

            request.onerror = error => reject(error); 
        });

    }
}