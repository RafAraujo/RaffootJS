let FieldLocalization = (function() {
    let _fieldLocalizations = [];

    return class FieldLocalization {
        constructor(position, line, column) {           
            this.position = position;
            this.line = line;
            this.column = column;
            this.name = this.name();
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

            _fieldLocalizations.push(new FieldLocalization(gk, 0, 2));

            for (let i = 1; i < 4; i++)
                _fieldLocalizations.push(new FieldLocalization(cb, 2, i));

            _fieldLocalizations.push(new FieldLocalization(lb, 3, 0));
            _fieldLocalizations.push(new FieldLocalization(rb, 3, 4));

            _fieldLocalizations.push(new FieldLocalization(lwb, 4, 0));
            _fieldLocalizations.push(new FieldLocalization(rwb, 4, 4));

            for (let i = 1; i < 4; i++)
                _fieldLocalizations.push(new FieldLocalization(cdm, 5, i));

            for (let i = 1; i < 4; i++)
                _fieldLocalizations.push(new FieldLocalization(cm, 6, i));

            _fieldLocalizations.push(new FieldLocalization(lm, 7, 0));
            _fieldLocalizations.push(new FieldLocalization(rm, 7, 4));

            for (let i = 1; i < 4; i++)
                _fieldLocalizations.push(new FieldLocalization(cam, 8, i));

            _fieldLocalizations.push(new FieldLocalization(lw, 9, 0));
            _fieldLocalizations.push(new FieldLocalization(ss, 9, 2));
            _fieldLocalizations.push(new FieldLocalization(rw, 9, 4));

            _fieldLocalizations.push(new FieldLocalization(st, 10, 1));
            _fieldLocalizations.push(new FieldLocalization(st, 10, 3));

            _fieldLocalizations.push(new FieldLocalization(cf, 11, 2));

            Object.freeze(_fieldLocalizations);
        }

        static all() {
            return _fieldLocalizations;
        }
        
        name() {
            let positions = Position.all();
            let side = '';

            if (positions.filter(p => ['CB', 'CDM', 'CM', 'CAM', 'ST'].some(a => a == p.abbreviation)).some(p => p == this.position))
                side = ['L', 'L', '', 'R', 'R'][this.column]
            
            return side + this.position.abbreviation;
        }
    }
})();