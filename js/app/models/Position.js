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
            let position = new Position();
            _positions.push(Object.assign(object, position));
            return position;
        }

        static all() {
            return _positions;
        }

        static seed() {
            let fieldRegions = FieldRegion.all();

            let goal = fieldRegions.find(fr => fr.name === 'goal');
            _positions.push(Position.create('Goalkeeper', 'GK', goal));

            let defense = fieldRegions.find(fr => fr.name === 'defense');
            _positions.push(Position.create('Center Back', 'CB', defense));
            _positions.push(Position.create('Right Back', 'RB', defense));
            _positions.push(Position.create('Left Back', 'LB', defense));
            _positions.push(Position.create('Right Wing Back', 'RWB', defense));
            _positions.push(Position.create('Left Wing Back', 'LWB', defense));

            let midfield = fieldRegions.find(fr => fr.name === 'midfield');       
            _positions.push(Position.create('Center Defensive Midfielder', 'CDM', midfield));
            _positions.push(Position.create('Right Midfielder', 'RM', midfield));
            _positions.push(Position.create('Center Midfielder', 'CM', midfield));
            _positions.push(Position.create('Left Midfielder', 'LM', midfield));
            _positions.push(Position.create('Center Attacking Midfielder', 'CAM', midfield));

            let attack = fieldRegions.find(fr => fr.name === 'attack');        
            _positions.push(Position.create('Right Wing', 'RW', attack));
            _positions.push(Position.create('Second Striker', 'SS', attack));
            _positions.push(Position.create('Left Wing', 'LW', attack));
            _positions.push(Position.create('Striker', 'ST', attack));
            _positions.push(Position.create('Center Forward', 'CF', attack));

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