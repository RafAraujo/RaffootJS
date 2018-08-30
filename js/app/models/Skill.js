let Skill = (function() {
    let _skills = [];

    return class Skill extends Entity {
        constructor(name, abbreviation, positionIds) {
            super();

            this.name = name;
            this.abbreviation = abbreviation;
            this._positionIds = positionIds;
        }

        static create(name, abbreviation, positions) {
            let skill = new Skill(name, abbreviation, positions.map(p => p.id));
            skill.id = _skills.push(skill);
            positions.forEach(p => p.addSkill(skill));
            return skill;
        }

        static load(objects) {
            _skills = objects.map(o => Object.assign(new Skill(), o));
        }

        static all() {
            return _skills;
        }

        static seed() {
            let positions = Position.all();

            let goalkeeper = positions.filter(p => p.isGoalkeeper);
            Skill.create('Throwing', 'THR', goalkeeper);
            Skill.create('Penalty Saves', 'PEN', goalkeeper);
            Skill.create('Positioning', 'POS', goalkeeper);
            Skill.create('Reflexes', 'REF', goalkeeper);
            Skill.create('Rushing Out', 'RUS', goalkeeper);

            let outfieldPlayers = positions.filter(p => !p.isGoalkeeper);
            Skill.create('Ambidextrous', 'AMB', outfieldPlayers);
            Skill.create('Ball Control', 'BAC', outfieldPlayers);
            Skill.create('Crossing', 'CRO', outfieldPlayers);
            Skill.create('Dead Ball', 'DBA', outfieldPlayers);        
            Skill.create('Dribbling', 'DRI', outfieldPlayers);        
            Skill.create('Finishing', 'FIN', outfieldPlayers);
            Skill.create('Heading', 'HEA', outfieldPlayers);
            Skill.create('Marking', 'MAR', outfieldPlayers);
            Skill.create('Mentality', 'MEN', outfieldPlayers);
            Skill.create('Passing', 'PAS', outfieldPlayers);
            Skill.create('Physical', 'PHY', outfieldPlayers);
            Skill.create('Speed', 'SPD', outfieldPlayers);
            Skill.create('Technique', 'TEC', outfieldPlayers);
            Skill.create('Teamwork', 'TWK', outfieldPlayers);
            Skill.create('Tackling', 'TAC', outfieldPlayers);
            Skill.create('Versatility', 'VER', outfieldPlayers);
            Skill.create('Vision', 'VIS', outfieldPlayers);

            Object.freeze(_skills);
        }

        get positions() {
            let positions = [];
            this._positionIds.forEach(pId => positions.push(Position.all()[pId - 1]));
            return positions;
        }
    }
})();
