let _skills = [];

class Skill {
    constructor(name, abbreviation, positions) {
        this.name = name;
        this.abbreviation = abbreviation;

        this.positions = positions;
        positions.forEach(p => p.addSkill(this));
    }

    static seed() {
        let positions = Position.all();

        let goalkeeper = [positions.find(p => p.isGoalkeeper)];
        let outfieldPlayers = positions.filter(p => !p.isGoalkeeper);
        
        _skills.push(new Skill('Throwing', 'THR', goalkeeper));          
        _skills.push(new Skill('Penalty Saves', 'PEN', goalkeeper));
        _skills.push(new Skill('Positioning', 'POS', goalkeeper));
        _skills.push(new Skill('Reflexes', 'REF', goalkeeper));
        _skills.push(new Skill('Rushing Out', 'RUS', goalkeeper));

        _skills.push(new Skill('Adaptability', 'ADA', outfieldPlayers));
        _skills.push(new Skill('Ambidextrous', 'AMB', outfieldPlayers));
        _skills.push(new Skill('Ball Control', 'BAC', outfieldPlayers));
        _skills.push(new Skill('Crossing', 'CRO', outfieldPlayers));
        _skills.push(new Skill('Dead Ball', 'DBA', outfieldPlayers));        
        _skills.push(new Skill('Dribbling', 'DRI', outfieldPlayers));        
        _skills.push(new Skill('Finishing', 'FIN', outfieldPlayers));
        _skills.push(new Skill('Heading', 'HEA', outfieldPlayers));
        _skills.push(new Skill('Marking', 'MAR', outfieldPlayers));
        _skills.push(new Skill('Passing', 'PAS', outfieldPlayers));
        _skills.push(new Skill('Physical', 'PAS', outfieldPlayers));
        _skills.push(new Skill('Speed', 'SPD', outfieldPlayers));
        _skills.push(new Skill('Stamina', 'STA', outfieldPlayers));
        _skills.push(new Skill('Technique', 'TEC', outfieldPlayers));
        _skills.push(new Skill('Teamwork', 'TWK', outfieldPlayers));
        _skills.push(new Skill('Tackling', 'TAC', outfieldPlayers));
        _skills.push(new Skill('Versatility', 'VER', outfieldPlayers));
        _skills.push(new Skill('Vision', 'VIS', outfieldPlayers));

        Object.freeze(_skills);
    }

    static all() {
        return _skills;
    }
}