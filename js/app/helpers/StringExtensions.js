String.prototype.toTitleCase = function() {
    return this.split(' ').map(function(value) {
        return value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
    }).join(' ');
}