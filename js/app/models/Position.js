let Position = (function() {
    let _positions = [];

    return class Position extends Entity {
        constructor(name, abbreviation, fieldRegionId) {
            super();

            this.name = name;
            this.abbreviation = abbreviation;
            this._fieldRegionId = fieldRegionId;
            this.skills = [];
        }

        static create(name, abbreviation, fieldRegion) {
            let position = new Position(name, abbreviation, fieldRegion.id);
            position.id = _positions.push(position);
            return position;
        }

        static load(object) {
            return super.updateList(_positions, Object.assign(new Position(), object));
        }

        static all() {
            return _positions;
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

        addSkill(value) {
            this.skills.push(value);
        }

        get isGoalkeeper() {
            return this.name === 'Goalkeeper';
        }
    }
})();