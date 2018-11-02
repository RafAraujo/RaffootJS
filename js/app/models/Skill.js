let Skill = (function () {
    let _skills = [];

    return class Skill extends Entity {
        constructor(name, abbreviation, type, goalkeeperOnly) {
            super();

            this.name = name;
            this.abbreviation = abbreviation;
            this.type = type;
            this.goalkeeperOnly = goalkeeperOnly;
        }

        static create(name, abbreviation, type, goalkeeperOnly) {
            let skill = new Skill(name, abbreviation, type, goalkeeperOnly);
            skill.id = _skills.push(skill);

            return skill;
        }

        static load(objects) {
            _skills = objects.map(o => Object.assign(new Skill(), o));
        }

        static all() {
            return _skills;
        }

        static seed() {
            Skill.create('Penalty Saves', 'PEN', 'action', true);
            Skill.create('Reflexes', 'REF', 'action', true);
            Skill.create('Throwing', 'THR', 'action', true);

            Skill.create('Crossing', 'CRO', 'action', false);
            Skill.create('Finishing', 'FIN', 'action', false);
            Skill.create('Heading', 'HEA', 'action', false);
            Skill.create('Passing', 'PAS', 'action', false);
            Skill.create('Tackling', 'TAC', 'action', false);

            Skill.create('Dribbling', 'DRI', 'attribute', false);
            Skill.create('Marking', 'MAR', 'attribute', false);
            Skill.create('Physical', 'PHY', 'attribute', false);
            Skill.create('Speed', 'SPD', 'attribute', false);
            Skill.create('Technique', 'TEC', 'attribute', false);
            Skill.create('Versatility', 'VER', 'attribute', false);

            Object.freeze(_skills);
        }

        static find(name) {
            return _skills.find(s => s.name === name);
        }

        static goalkeeperSkills() {
            return _skills.filter(s => s.goalkeeperOnly);
        }

        static attributeSkills() {
            return _skills.filter(s => s.type === 'attribute');
        }
    }
})();