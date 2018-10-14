let ClubColors = (function () {
    let _clubColors = [];

    return class ClubColors extends Entity {
        constructor(background, foreground) {
            super();

            this.background = background;
            this.foreground = foreground;
        }

        static create(background, foreground) {
            let clubColors = new ClubColors(background, foreground);
            clubColors.id = _clubColors.push(clubColors);
            return clubColors;
        }

        static load(objects) {
            _clubColors = objects.map(o => Object.assign(new ClubColors(), o));
        }

        static all() {
            return _clubColors;
        }

        static find(background, foreground) {
            let clubColors = ClubColors.all().find(cc => cc.background === background && cc.foreground === foreground);
            if (!clubColors)
                clubColors = ClubColors.create(background, foreground);
            return clubColors;
        }
    }
})();