Date.daysInMonth = function(month, year) {
    let date = new Date(year, month, 1);
    date.setMonth(month + 1);
    date.setDate(0);
    return date.getDate();
};

Date.firstDayCurrentYear = function() {
    let date = new Date();
    date.setMonth(0);
    date.setDate(1);
    return date;
};

Date.firstSunday = (month, year) => {
    let date = new Date(year, month, 1);
    
    let day = date.getDay();

    if (day !== 0)
        date.setDate(date.getDate() + (7 - day));

    return date;
};

Date.calculateAge = (birth, currentDate) => {
    let age = currentDate.getFullYear() - birth.getFullYear();
    let month = currentDate.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && currentDate.getDate() < birth.getDate()))
        age--;
    return age;
};

Date.monthDiff = (d1, d2) => {
    let months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months > 0 ? months : 0;
};

Date.prototype.addDays = function(value) {
    let date = new Date(this);
    date.setDate(this.getDate() + value);
    return date;
};

Date.prototype.addMonths = function(value) {
    let date = new Date(this);
    date.setMonth(this.getMonth() + value);
    return date;
};