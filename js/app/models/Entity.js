let Entity = (function(){
    let _stores = [];

    return class Entity {
        constructor() {
            let store = this.constructor.name;

            if (!_stores.includes(store))
                _stores.push(store);
        }

        static stores() {
            return _stores;
        }

        load(save) {
            let properties = Object.keys(this);

            for (let i = 0; i < properties.length; i++)
                alert(properties[i]);
        }

        selectMany(array) {
            let properties = array.split('.');
        
            if (properties.length !== 2)
                throw new RangeError('Entity.selectMany(array)');

            return this[properties[0]].map(c => c[properties[1]]).reduce((a, b) => a.concat(b));
        }
    }
})();