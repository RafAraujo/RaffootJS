class GenericDAO {
    constructor(connection, entity) {
        this._connection = connection;
        this._entity = entity;
    }

    save(object) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._entity.store], 'readwrite')
                .objectStore(this._entity.store)
                .add(object);

            request.onsuccess = () => resolve();

            request.onerror = e => {
                console.log(e.target.error);
                reject('Could not save');
            };
        });
    }

    all() {
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

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Could not get the list');
            };
        });
    }

    clearAll() {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._entity.store], 'readwrite')
                .objectStore(this._entity.store)
                .clear();

            request.onsuccess = () => resolve();

            request.onerror = e => {
                console.log(e.target.error);
                reject('Could not clear the list');
            }; 

        });

    }
}