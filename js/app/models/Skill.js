let Skill = (function () {
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

            let outfieldPlayers = positions.filter(p => !p.isGoalkeeper);
            Skill.create('Ambidextrous', 'AMB', outfieldPlayers);
            Skill.create('Crossing', 'CRO', outfieldPlayers);
            Skill.create('Dead Ball', 'DBA', outfieldPlayers);
            Skill.create('Dribbling', 'DRI', outfieldPlayers);
            Skill.create('Finishing', 'FIN', outfieldPlayers);
            Skill.create('Heading', 'HEA', outfieldPlayers);
            Skill.create('Marking', 'MAR', outfieldPlayers);
            Skill.create('Passing', 'PAS', outfieldPlayers);
            Skill.create('Physical', 'PHY', outfieldPlayers);
            Skill.create('Speed', 'SPD', outfieldPlayers);
            Skill.create('Tackling', 'TAC', outfieldPlayers);
            Skill.create('Versatility', 'VER', outfieldPlayers);

            Object.freeze(_skills);
        }

        get positions() {
            return Position.all().filterById(this._positionIds);
        }
    }
})();