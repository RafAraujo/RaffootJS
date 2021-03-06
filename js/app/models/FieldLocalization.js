let FieldLocalization = (function () {
    let _fieldLocalizations = [];

    const _SIDES = Object.freeze(['L', 'L', 'C', 'R', 'R']);

    return class FieldLocalization extends Entity {
        constructor(positionId, line, column, name) {
            super();

            this._positionId = positionId;
            this.line = line;
            this.column = column;
            this.name = name;
        }

        static create(position, line, column) {
            let fieldLocalization = new FieldLocalization(position.id, line, column, _name());
            fieldLocalization.id = _fieldLocalizations.push(fieldLocalization);
            position.addFieldLocalization(fieldLocalization);
            return fieldLocalization;

            function _name() {
                let side = '';

                if (column !== 2 && ['CB', 'CDM', 'CM', 'CAM', 'ST'].some(a => a === position.abbreviation))
                    side = _SIDES[column];

                return `${side}${position.abbreviation}`;
            }
        }

        static load(objects) {
            _fieldLocalizations = objects.map(o => Object.assign(new FieldLocalization(), o));
        }

        static all() {
            return _fieldLocalizations;
        }

        static seed() {
            let positions = Position.all();

            let gk = positions.find(p => p.name === 'Goalkeeper');
            let cb = positions.find(p => p.name === 'Center Back');
            let rb = positions.find(p => p.name === 'Right Back');
            let lb = positions.find(p => p.name === 'Left Back');
            let rwb = positions.find(p => p.name === 'Right Wing Back');
            let lwb = positions.find(p => p.name === 'Left Wing Back');
            let cdm = positions.find(p => p.name === 'Center Defensive Midfielder');
            let rm = positions.find(p => p.name === 'Right Midfielder');
            let cm = positions.find(p => p.name === 'Center Midfielder');
            let lm = positions.find(p => p.name === 'Left Midfielder');
            let cam = positions.find(p => p.name === 'Center Attacking Midfielder');
            let rw = positions.find(p => p.name === 'Right Wing');
            let ss = positions.find(p => p.name === 'Second Striker');
            let lw = positions.find(p => p.name === 'Left Wing');
            let st = positions.find(p => p.name === 'Striker');
            let cf = positions.find(p => p.name === 'Center Forward');

            FieldLocalization.create(gk, 0, 2);

            for (let i = 1; i < 4; i++)
                FieldLocalization.create(cb, 2, i);

            FieldLocalization.create(lb, 3, 0);
            FieldLocalization.create(rb, 3, 4);

            FieldLocalization.create(lwb, 4, 0);
            FieldLocalization.create(rwb, 4, 4);

            for (let i = 1; i < 4; i++)
                FieldLocalization.create(cdm, 5, i);

            for (let i = 1; i < 4; i++)
                FieldLocalization.create(cm, 6, i);

            FieldLocalization.create(lm, 7, 0);
            FieldLocalization.create(rm, 7, 4);

            for (let i = 1; i < 4; i++)
                FieldLocalization.create(cam, 8, i);

            FieldLocalization.create(lw, 9, 0);
            FieldLocalization.create(ss, 9, 2);
            FieldLocalization.create(rw, 9, 4);

            FieldLocalization.create(st, 10, 1);
            FieldLocalization.create(st, 10, 3);

            FieldLocalization.create(cf, 11, 2);

            Object.freeze(_fieldLocalizations);
        }

        static sides() {
            return _SIDES;
        }

        static goalkeeper() {
            return _fieldLocalizations[0];
        }

        get position() {
            return Position.all()[this._positionId - 1];
        }

        get side() {
            return _SIDES[this.column];
        }

        get inverse() {
            return new FieldLocalization(this.position.id, 11 - this.line, this.column === 2 ? 2 : 5 - this.column, this.name);
        }

        distanceTo(fieldLocalization) {
            let x = this.line - fieldLocalization.line;
            let y = this.column - fieldLocalization.column;

            let distance = Math.hypot(x, y);
            if (this.position !== fieldLocalization.position)
                distance *= 2;
            
            return distance;
        }

        distanceToOpponent(fieldLocalization) {
            return this.distanceTo(fieldLocalization.inverse);
        }
    }
})();
