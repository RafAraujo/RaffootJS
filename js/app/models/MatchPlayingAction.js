let MatchPlayingAction = (function () {
    let _matchPlayingActions = [];

    return class MatchPlayingAction extends Entity {
        constructor(name, skillId, highBall) {
            super();

            this.name = name;
            this._skillId = skillId;
            this.highBall = highBall;
        }

        static create(name, skill, highBall) {
            let matchPlayingAction = new MatchPlayingAction(name, skill.id, highBall);
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
            MatchPlayingAction.create('Defending', Skill.find('Reflexes'), false);

            MatchPlayingAction.create('Crossing', Skill.find('Crossing'), false);
            MatchPlayingAction.create('Dribbling', Skill.find('Dribbling'), false);
            MatchPlayingAction.create('Heading', Skill.find('Heading'), true);
            MatchPlayingAction.create('Finishing', Skill.find('Finishing'), false);
            MatchPlayingAction.create('Marking', Skill.find('Marking'), false);
            MatchPlayingAction.create('Passing', Skill.find('Passing'), true);
            MatchPlayingAction.create('Tackling', Skill.find('Tackling'), false);

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