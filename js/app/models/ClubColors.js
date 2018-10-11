let ClubColors = (function () {
    let _clubColors = [];

    return class ClubColors {
        constructor(background, foreground) {
            this.background = background;
            this.foreground = foreground;
        }

        static create(background, foreground) {
            let clubColors = new ClubColors(background, foreground);
            clubColors.id = _clubColors.push(clubColors);
            return clubColors;
        }

        static all() {
            _clubColors = [];

            ClubColors.create('Black', 'White');
            ClubColors.create('Black', 'Gold');
            ClubColors.create('Black', 'LightBlue');
            ClubColors.create('Black', 'LightGreen');
            ClubColors.create('Black', 'Salmon');
            ClubColors.create('Blue', 'Gold');
            ClubColors.create('Blue', 'White');
            ClubColors.create('Brown', 'White');
            ClubColors.create('Cyan', 'Black');
            ClubColors.create('Crimson', 'Black');
            ClubColors.create('Crimson', 'White');
            ClubColors.create('DarkBlue', 'White');
            ClubColors.create('DarkBlue', 'Gold');
            ClubColors.create('DarkGreen', 'White');
            ClubColors.create('DarkRed', 'LightBlue');
            ClubColors.create('DarkRed', 'White');
            ClubColors.create('DodgerBlue', 'White');
            ClubColors.create('Gold', 'Black');
            ClubColors.create('Gray', 'White');
            ClubColors.create('Green', 'White');
            ClubColors.create('GreenYellow', 'Black');
            ClubColors.create('Khaki', 'Black');
            ClubColors.create('LightBlue', 'Black');
            ClubColors.create('LightGreen', 'Black');
            ClubColors.create('Orange', 'Black');
            ClubColors.create('OrangeRed', 'White');
            ClubColors.create('Purple', 'White');
            ClubColors.create('Red', 'Black');
            ClubColors.create('Red', 'White');
            ClubColors.create('RoyalBlue', 'White');
            ClubColors.create('White', 'Black');
            ClubColors.create('White', 'Blue');
            ClubColors.create('White', 'Green');
            ClubColors.create('White', 'OrangeRed');
            ClubColors.create('White', 'Purple');
            ClubColors.create('White', 'Red');

            return _clubColors;
        }
    }
})();