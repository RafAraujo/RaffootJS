let _positions = [];

class Position {
    constructor(name, abbreviation, fieldRegion) {
        this.id = _positions.length + 1;
        this.name = name;
        this.abbreviation = abbreviation;
        this.fieldRegion = fieldRegion;
        this.skills = [];

        _positions.push(this);
        fieldRegion.addPosition(this);
    }

    static seed() {
        let fieldRegions = FieldRegion.all();

        let goal = fieldRegions.find(fr => fr.name === 'goal');
        new Position('Goalkeeper', 'GK', goal);

        let defense = fieldRegions.find(fr => fr.name === 'defense');
        new Position('Center Back', 'CB', defense);
        new Position('Right Back', 'RB', defense);
        new Position('Left Back', 'LB', defense);
        new Position('Right Wing Back', 'RWB', defense);
        new Position('Left Wing Back', 'LWB', defense);

        let midfield = fieldRegions.find(fr => fr.name === 'midfield');       
        new Position('Center Defensive Midfielder', 'CDM', midfield);
        new Position('Right Midfielder', 'RM', midfield);
        new Position('Center Midfielder', 'CM', midfield);
        new Position('Left Midfielder', 'LM', midfield);
        new Position('Center Attacking Midfielder', 'CAM', midfield);

        let attack = fieldRegions.find(fr => fr.name === 'attack');        
        new Position('Right Wing', 'RW', attack);
        new Position('Second Striker', 'SS', attack);
        new Position('Left Wing', 'LW', attack);
        new Position('Striker', 'ST', attack);
        new Position('Center Forward', 'CF', attack);

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