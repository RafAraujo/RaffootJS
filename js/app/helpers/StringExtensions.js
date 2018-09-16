String.prototype.equals = function (value, ignoreCase) {
    return ignoreCase ? this.toLowerCase() === value.toLowerCase() : this === value
};

String.prototype.toTitleCase = function () {
    return this.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()).join(' ');
};

String.prototype.htmlDecode = function () {
    return this.replace('&amp;#39;', "'").replace('&#34;', '\\').replace('&#39;', "'");
}