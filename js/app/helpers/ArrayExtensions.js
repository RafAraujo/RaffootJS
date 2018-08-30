Array.prototype.average = function() {
    return this.sum() / this.length;
}

Array.prototype.getRandomItem = function() {
    return this[Random.number(this.length - 1)];
}

Array.prototype.first = function() {
    return this[0];
}

Array.prototype.firstItems = function(count) {
    if (count > this.length)
        throw new RangeError('ArrayExtensions.firstItems(count)');
    return this.slice(0, count);
}

Array.prototype.getRandomItems = function(count) {
    if (count > this.length)
        throw new RangeError('ArrayExtensions.getRandomItems(count)');
    
    let result = this.slice();
    result.shuffle();
    return result.slice(0, count);
}

Array.prototype.last = function() {
    return this[this.length - 1];
}

Array.prototype.lastItems = function(count) {
    if (count > this.length)
        throw new RangeError('ArrayExtensions.lastItems(count)');
    return this.slice(this.length - count);
}

Array.prototype.max = function() {
    return this.reduce((a, b) => Math.max(a, b));
}

Array.prototype.orderBy = function() {
    return this.sort(dynamicSort(arguments));
}

function dynamicSort(properties) {
    return function (a, b) {
        let i = 0, result = 0;

        while (result === 0 && i < properties.length) {
            let order = 1;
            let property = properties[i++];

            if (property[0] === '-') {
                order = -1;
                property = property.substr(1);
            }

            let valueA = value(a, property);
            let valueB = value(b, property);

            if (typeof valueA === 'string')
                result = valueA.localeCompare(valueB) * order;
            else
                result = (valueA < valueB ? -1 : valueA > valueB ? 1 : 0) * order;
        }

        return result;

        function value(object, propertyPath) {
            let value = object;
            propertyPath.split('.').forEach(p => value = value[p]);
            return value;
        }
    }
}

Array.prototype.remove = function(item) {
    let index = this.indexOf(item);
    if (index != -1)
        return this.splice(index, 1);
}

Array.prototype.rotate = function() {
    this.unshift(this.pop());
}

Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
        let index = Random.number(i);
        let aux = this[i];
        this[i] = this[index];
        this[index] = aux;
    }
}

Array.prototype.filterById = function(arrayIds) {
    return arrayIds.map(id => this[id - 1]);
}

Array.prototype.sum = function() {
    return this.reduce((a, b) => a + b);
}
