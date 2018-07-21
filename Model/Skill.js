let _skills = [];

class Skill {
    constructor(name, abbreviation, positions) {
        this.id = _skills.length + 1;
        this.name = name;
        this.abbreviation = abbreviation;

        this.positions = positions;


        _skills.push(this);
        positions.forEach(p => p.addSkill(this));
    }

    static seed() {
        let positions = Position.all();

        let goalkeeper = [positions.find(p => p.isGoalkeeper)];
        let outfieldPlayers = positions.filter(p => !p.isGoalkeeper);
        
        new Skill('Throwing', 'THR', goalkeeper);          
        new Skill('Penalty Saves', 'PEN', goalkeeper);
        new Skill('Positioning', 'POS', goalkeeper);
        new Skill('Reflexes', 'REF', goalkeeper);
        new Skill('Rushing Out', 'RUS', goalkeeper);

        new Skill('Adaptability', 'ADA', outfieldPlayers);
        new Skill('Ambidextrous', 'AMB', outfieldPlayers);
        new Skill('Ball Control', 'BAC', outfieldPlayers);
        new Skill('Crossing', 'CRO', outfieldPlayers);
        new Skill('Dead Ball', 'DBA', outfieldPlayers);        
        new Skill('Dribbling', 'DRI', outfieldPlayers);        
        new Skill('Finishing', 'FIN', outfieldPlayers);
        new Skill('Heading', 'HEA', outfieldPlayers);
        new Skill('Marking', 'MAR', outfieldPlayers);
        new Skill('Passing', 'PAS', outfieldPlayers);
        new Skill('Physical', 'PAS', outfieldPlayers);
        new Skill('Speed', 'SPD', outfieldPlayers);
        new Skill('Stamina', 'STA', outfieldPlayers);
        new Skill('Technique', 'TEC', outfieldPlayers);
        new Skill('Teamwork', 'TWK', outfieldPlayers);
        new Skill('Tackling', 'TAC', outfieldPlayers);
        new Skill('Versatility', 'VER', outfieldPlayers);
        new Skill('Vision', 'VIS', outfieldPlayers);

        Object.freeze(_skills);
    }

    static all() {
        return _skills;
    }
}