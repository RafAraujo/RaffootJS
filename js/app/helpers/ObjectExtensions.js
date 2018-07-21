Object.prototype.selectMany = function(subArray) {
    let properties = subArray.split('.');

    if (properties.length !== 2)
        throw new RangeError('ObjectExtensions.selectMany(subArray)');

    return this[properties[0]].map(c => c[properties[1]]).reduce((a, b) => a.concat(b));
}