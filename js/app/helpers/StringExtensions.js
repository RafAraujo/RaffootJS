String.prototype.toTitleCase = function() {
    return this.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()).join(' ');
}