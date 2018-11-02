let MatchPlayingAction = (function () {
    let _matchPlayingActions = [];

    return class MatchPlayingAction extends Entity {
        constructor(name, skillId) {
            super();

            this.name = name;
            this._skillId = skillId;
        }

        static create(name, skill) {
            let matchPlayingAction = new MatchPlayingAction(name, skill.id);
            matchPlayingAction.id = _matchPlayingActions.push(matchPlayingAction);
            return matchPlayingAction;
        }

        static load(objects) {
            _matchPlayingActions = objects.map(o => Object.assign(new MatchPlayingAction(), o));
        }

        static all() {
            return _matchPlayingActions;
        }

        static seed() {
            MatchPlayingAction.create('Defending', Skill.find('Reflexes'));

            MatchPlayingAction.create('Crossing', Skill.find('Crossing'));
            MatchPlayingAction.create('Dribbling', Skill.find('Crossing'));
            MatchPlayingAction.create('Heading', Skill.find('Heading'));
            MatchPlayingAction.create('Finishing', Skill.find('Finishing'));
            MatchPlayingAction.create('Marking', Skill.find('Marking'));
            MatchPlayingAction.create('Passing', Skill.find('Passing'));
            MatchPlayingAction.create('Tackling', Skill.find('Tackling'));

            Object.freeze(_matchPlayingActions);
        }

        static find(name) {
            return _matchPlayingActions.find(mpa => mpa.name === name);
        }

        get skill() {
            return Skill.all()[this._skillId - 1];
        }
    }
})();