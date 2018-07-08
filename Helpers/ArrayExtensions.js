Array.prototype.getRandomItem = function() {
    return this[Random.number(this.length - 1)];
}

Array.prototype.first = function() {
    return this[0];
}

Array.prototype.firstItems = function(count) {
    if (count > this.length)
        throw new RangeError('ArrayExtensions.getRandomItems(n)');
    return this.slice(0, count);
}

Array.prototype.getRandomItems = function(n) {
    if (n > this.length)
        throw new RangeError('ArrayExtensions.getRandomItems(n)');
    
    let result = new Array(n);
    let available = this.slice().shuffle(); 
    
    for (let i = 0; i < n; i++)
        result[i] = available[i];

    return result;
}

Array.prototype.last = function() {
    return this[this.length - 1];
}

Array.prototype.lastItems = function(count) {
    if (count > this.length)
        throw new RangeError('ArrayExtensions.getRandomItems(n)');
    return this.slice(this.length - count);
}

Array.prototype.max = function() {
    return this.reduce((a, b) => Math.max(a, b));
}

Array.prototype.orderBy = function() {
    return this.sort(dynamicSort(arguments, 1));
}

Array.prototype.orderByDescending = function() {
    return this.sort(dynamicSort(arguments, -1));
}

function dynamicSort(properties, order) {
    return function (a, b) {
        let i = 0, result = 0;

        while (result === 0 && i < properties.length) {
            let property = properties[i++];
            if (typeof a[property] === 'string')
                result = a[property].localeCompare(b[property]) * order;
            else
                result = (a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0) * order;
        }

        return result;
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
    let result = this.slice();

    for (let i = result.length - 1; i > 0; i--) {
        let index = Random.number(i);
        let aux = result[i];
        result[i] = result[index];
        result[index] = aux;
    }

    return result;
}

Array.prototype.sum = function() {
    return this.reduce((a, b) => a + b);
}