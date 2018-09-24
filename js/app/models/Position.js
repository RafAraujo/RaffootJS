let Position = (function () {
    let _positions = [];

    return class Position extends Entity {
        constructor(name, abbreviation, fieldRegionId) {
            super();

            this.name = name;
            this.abbreviation = abbreviation;
            this._fieldRegionId = fieldRegionId;
            this._fieldLocalizationIds = [];
            this._skillIds = [];
        }

        static create(name, abbreviation, fieldRegion) {
            let position = new Position(name, abbreviation, fieldRegion.id);
            position.id = _positions.push(position);
            fieldRegion.addPosition(position);
            return position;
        }

        static load(objects) {
            _positions = objects.map(o => Object.assign(new Position(), o));
        }

        static all() {
            return _positions;
        }

        static allProportional() {
            return Formation.all().map(f => f.fieldLocalizations.map(fl => fl.position)).reduce((a, b) => a.concat(b));
        }

        static seed() {
            let fieldRegions = FieldRegion.all();

            let goal = fieldRegions.find(fr => fr.name === 'goal');
            Position.create('Goalkeeper', 'GK', goal);

            let defense = fieldRegions.find(fr => fr.name === 'defense');
            Position.create('Center Back', 'CB', defense);
            Position.create('Right Back', 'RB', defense);
            Position.create('Left Back', 'LB', defense);
            Position.create('Right Wing Back', 'RWB', defense);
            Position.create('Left Wing Back', 'LWB', defense);

            let midfield = fieldRegions.find(fr => fr.name === 'midfield');
            Position.create('Center Defensive Midfielder', 'CDM', midfield);
            Position.create('Right Midfielder', 'RM', midfield);
            Position.create('Center Midfielder', 'CM', midfield);
            Position.create('Left Midfielder', 'LM', midfield);
            Position.create('Center Attacking Midfielder', 'CAM', midfield);

            let attack = fieldRegions.find(fr => fr.name === 'attack');
            Position.create('Right Wing', 'RW', attack);
            Position.create('Second Striker', 'SS', attack);
            Position.create('Left Wing', 'LW', attack);
            Position.create('Striker', 'ST', attack);
            Position.create('Center Forward', 'CF', attack);

            Object.freeze(_positions);
        }

        get fieldRegion() {
            return FieldRegion.all()[this._fieldRegionId - 1];
        }

        get fieldLocalizations() {
            return FieldLocalization.all().filterById(this._fieldLocalizationIds);
        }

        get line() {
            return this.fieldLocalizations.map(fl => fl.line)[0];
        }

        get hasMultipleSides() {
            return this.fieldLocalizations.map(fl => fl.column).length > 1;
        }

        get skills() {
            return Skill.all().filterById(this._skillIds);
        }

        get isGoalkeeper() {
            return this.name === 'Goalkeeper';
        }

        addFieldLocalization(fieldLocalization) {
            this._fieldLocalizationIds.push(fieldLocalization.id);
        }

        addSkill(skill) {
            this._skillIds.push(skill.id);
        }
    }
})();