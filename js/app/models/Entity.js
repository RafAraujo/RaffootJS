let Entity = (function(){
    let _children = [];

    return class Entity {
        constructor() {
            if (!_children.includes(this.constructor))
                _children.push(this.constructor);
        }

        static children() {
            return _children;
        }

        static stores() {
            return _children.map(c => c.name);
        }

        static load(object) {
            let properties = Object.keys(object);

            for (let i = 0; i < properties.length; i++) {
                let property = properties[i];

                let _class = _children.find(c => c.constructor.name.equals(object[property][i], true));

                if (_class != null) {
                    convert(object, _class);
                }
            }
        }

        static convert(object, type) {
            return new (type)(...Object.values(object));
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