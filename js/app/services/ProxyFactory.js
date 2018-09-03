class ProxyFactory {

    static create(object, properties, action) {     
        return new Proxy(object, {

            get(target, property, receiver) {        
                if (properties.includes(property) && ProxyFactory._isFunction(target[property])) {
                    return function() {
                        let result = Reflect.apply(target[property], target, arguments);
                        action(target);
                        return result;
                    }
                }
                
                return Reflect.get(target, property, receiver);
            },
                
            set(target, property, value, receiver) {
                let result = Reflect.set(target, property, value, receiver);
                if (properties.includes(property))
                    action(target);
                return result;
            }
        });
    }
    
    static _isFunction(func) {    
        return typeof(func) == typeof(Function);
    }
}