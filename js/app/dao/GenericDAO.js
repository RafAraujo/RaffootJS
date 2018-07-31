class GenericDAO {
    constructor(connection) {
        this._connection = connection;
    }

    insert(object) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._entity.store], 'readwrite')
                .objectStore(this._entity.store)
                .add(object);

            request.onsuccess = () => resolve();

            request.onerror = error => reject(error);
        });
    }

    update(object) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._entity.store], 'readwrite')
                .objectStore(this._entity.store)
                .put(object);

            request.onsuccess = () => resolve();

            request.onerror = error => reject(error);
        });
    }

    select() {
        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._entity.store], 'readwrite')
                .objectStore(this._entity.store)
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

    delete(object) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._entity.store], 'readwrite')
                .objectStore(this._entity.store)
                .delete(object.id);

            request.onsuccess = () => resolve();

            request.onerror = error => reject(error); 
        });

    }
}