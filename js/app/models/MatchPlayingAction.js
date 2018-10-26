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
            MatchPlayingAction.create('Crossing', 'Attacking');
            MatchPlayingAction.create('Dribbling', 'Attacking');
            MatchPlayingAction.create('Finishing', 'Attacking');
            MatchPlayingAction.create('Heading', 'Attacking');
            MatchPlayingAction.create('Passing', 'Attacking');
            MatchPlayingAction.create('Running', 'Attacking');

            MatchPlayingAction.create('Heading', 'Defending');
            MatchPlayingAction.create('Marking', 'Defending');
            MatchPlayingAction.create('Tackling', 'Defending');

            Object.freeze(_confederations);
        }
    }
})();