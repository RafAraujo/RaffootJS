let Position = (function() {
    let _positions = [];

    return class Position extends Entity {
        constructor(name, abbreviation, fieldRegion) {
            super();

            this.name = name;
            this.abbreviation = abbreviation;
            this.fieldRegion = fieldRegion;
            this.skills = [];

            fieldRegion.addPosition(this);
        }

        static seed() {
            let fieldRegions = FieldRegion.all();

            let goal = fieldRegions.find(fr => fr.name === 'goal');
            _positions.push(new Position('Goalkeeper', 'GK', goal));

            let defense = fieldRegions.find(fr => fr.name === 'defense');
            _positions.push(new Position('Center Back', 'CB', defense));
            _positions.push(new Position('Right Back', 'RB', defense));
            _positions.push(new Position('Left Back', 'LB', defense));
            _positions.push(new Position('Right Wing Back', 'RWB', defense));
            _positions.push(new Position('Left Wing Back', 'LWB', defense));

            let midfield = fieldRegions.find(fr => fr.name === 'midfield');       
            _positions.push(new Position('Center Defensive Midfielder', 'CDM', midfield));
            _positions.push(new Position('Right Midfielder', 'RM', midfield));
            _positions.push(new Position('Center Midfielder', 'CM', midfield));
            _positions.push(new Position('Left Midfielder', 'LM', midfield));
            _positions.push(new Position('Center Attacking Midfielder', 'CAM', midfield));

            let attack = fieldRegions.find(fr => fr.name === 'attack');        
            _positions.push(new Position('Right Wing', 'RW', attack));
            _positions.push(new Position('Second Striker', 'SS', attack));
            _positions.push(new Position('Left Wing', 'LW', attack));
            _positions.push(new Position('Striker', 'ST', attack));
            _positions.push(new Position('Center Forward', 'CF', attack));

            Object.freeze(_positions);
        }

        static all() {
            return _positions;
        }

        addSkill(value) {
            this.skills.push(value);
        }

        get isGoalkeeper() {
            return this.name === 'Goalkeeper';
        }
    }
})();