let MatchPlayingAction = (function () {
    let _matchPlayingActions = [];

    return class MatchPlayingAction extends Entity {
        constructor(name) {
            super();

            this.name = name;
        }

        static create(name) {
            let matchPlayingAction = new MatchPlayingAction(name);
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
            MatchPlayingAction.create('Crossing', 'Attacking', Skill.find('Crossing'));
            MatchPlayingAction.create('Dribbling', 'Attacking', Skill.find('Dribbling'));
            MatchPlayingAction.create('Finishing', 'Attacking', Skill.find('Finishing'));
            MatchPlayingAction.create('Heading', 'Attacking', Skill.find('Heading'));
            MatchPlayingAction.create('Passing', 'Attacking', Skill.find('Passing'));

            MatchPlayingAction.create('Heading', 'Defending', Skill.find('Heading'));
            MatchPlayingAction.create('Marking', 'Defending', Skill.find('Marking'));
            MatchPlayingAction.create('Tackling', 'Defending', Skill.find('Tackling'));

            Object.freeze(_confederations);
        }
    }
})();