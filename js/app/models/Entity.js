let Entity = (function(){
    let _children = [];

    return class Entity {
        constructor() {
            if (!_children.includes(this.constructor))
                _children.push(this.constructor);
        }

        static all() {
            return Entity.children().map(e => e.all()).reduce((result, array) => result.concat(array));
        }

        static children() {
            return _children;
        }

        static stores() {
            return _children.map(c => c.name);
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