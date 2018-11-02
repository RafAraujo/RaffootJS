let Position = (function () {
    let _positions = [];

    return class Position extends Entity {
        constructor(name, abbreviation, fieldRegionId, skillIds, defendingActionsIds, attackingActionsIds) {
            super();

            this.name = name;
            this.abbreviation = abbreviation;
            this._fieldRegionId = fieldRegionId;
            this._fieldLocalizationIds = [];
            this._skillIds = skillIds;
            this._defendingActionsIds = defendingActionsIds;
            this._attackingActionIds = attackingActionsIds;
        }

        static create(name, abbreviation, fieldRegion, defendingActions, attackingActions) {
            let skillIds = abbreviation === 'GK' ? Skill.goalkeeperSkills() : defendingActions.concat(attackingActions).map(mpa => mpa.skill).concat(Skill.attributeSkills()).map(s => s.id);

            let position = new Position(name, abbreviation, fieldRegion.id, skillIds, defendingActions.map(mpa => mpa.id), attackingActions.map(mpa => mpa.id));
            position.id = _positions.push(position);
            fieldRegion.addPosition(position);
            return position;
        }

        static load(objects) {
            _positions = objects.map(o => Object.assign(new Position(), o));
        }

        static all() {
            return _positions;
        }

        static seed() {
            let goal = FieldRegion.find('goal');
            let defense = FieldRegion.find('defense');
            let midfield = FieldRegion.find('midfield');
            let attack = FieldRegion.find('attack');

            let crossing = MatchPlayingAction.find('Crossing');
            let defending = MatchPlayingAction.find('Defending');
            let heading = MatchPlayingAction.find('Heading');
            let finishing = MatchPlayingAction.find('Finishing');
            let passing = MatchPlayingAction.find('Passing');
            let tackling = MatchPlayingAction.find('Tackling');

            Position.create('Goalkeeper', 'GK', goal, [defending], [passing]);

            Position.create('Center Back', 'CB', defense, [tackling], [passing]);
            Position.create('Right Back', 'RB', defense, [tackling], [crossing, passing]);
            Position.create('Left Back', 'LB', defense, [tackling], [crossing, passing]);
            Position.create('Right Wing Back', 'RWB', defense, [tackling], [crossing, passing]);
            Position.create('Left Wing Back', 'LWB', defense, [tackling], [crossing, passing]);

            Position.create('Center Defensive Midfielder', 'CDM', midfield, [tackling], [passing]);
            Position.create('Center Midfielder', 'CM', midfield, [], [passing]);
            Position.create('Right Midfielder', 'RM', midfield, [], [crossing, passing]);
            Position.create('Left Midfielder', 'LM', midfield, [], [crossing, passing]);
            Position.create('Center Attacking Midfielder', 'CAM', midfield, [], [finishing, passing]);

            Position.create('Right Wing', 'RW', attack, [], [crossing, finishing, passing]);
            Position.create('Second Striker', 'SS', attack, [], [finishing, heading, passing]);
            Position.create('Left Wing', 'LW', attack, [], [crossing, finishing, passing]);
            Position.create('Striker', 'ST', attack, [], [heading, finishing]);
            Position.create('Center Forward', 'CF', attack, [], [heading, finishing]);

            Object.freeze(_positions);
        }

        static allProportional() {
            return Formation.all().map(f => f.fieldLocalizations.map(fl => fl.position)).reduce((a, b) => a.concat(b));
        }

        get fieldRegion() {
            return FieldRegion.all()[this._fieldRegionId - 1];
        }

        get fieldLocalizations() {
            return FieldLocalization.all().filterById(this._fieldLocalizationIds);
        }

        get line() {
            return this.fieldLocalizations.map(fl => fl.line)[0];
        }

        get hasMultipleSides() {
            return this.fieldLocalizations.map(fl => fl.column).length > 1;
        }

        get skills() {
            return Skill.all().filterById(this._skillIds);
        }

        get defendingActions() {
            return MatchPlayingAction.all().filterById(this._defendingActionsIds);
        }

        get attackingActions() {
            return MatchPlayingAction.all().filterById(this._attackingActionIds);
        }

        get isGoalkeeper() {
            return this.name === 'Goalkeeper';
        }

        addFieldLocalization(fieldLocalization) {
            this._fieldLocalizationIds.push(fieldLocalization.id);
        }

        addSkill(skill) {
            this._skillIds.push(skill.id);
        }
    }
})();