let Entity = (function(){
    let _stores = [];

    return class Entity {
        constructor() {
            if (!_stores.includes(this.store))
                _stores.push(this.store);
        }

        static stores() {
            return _stores;
        }

        get store() {
            return this.constructor.name;
        }

        selectMany(array) {
            let properties = array.split('.');
        
            if (properties.length !== 2)
                throw new RangeError('Entity.selectMany(array)');

            return this[properties[0]].map(c => c[properties[1]]).reduce((a, b) => a.concat(b));
        }
    }
})();