let FieldLocalization = (function() {
    let _fieldLocalizations = [];

    return class FieldLocalization {
        constructor(position, line, column) {
            this.id = _fieldLocalizations.length + 1;
            
            this.position = position;
            
            this.line = line;
            this.column = column;

            this.name = this.name();

            _fieldLocalizations.push(this);
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

            new FieldLocalization(gk, 0, 2);

            for (let i = 1; i < 4; i++)
                new FieldLocalization(cb, 2, i);

            new FieldLocalization(lb, 3, 0);
            new FieldLocalization(rb, 3, 4);

            new FieldLocalization(lwb, 4, 0);
            new FieldLocalization(rwb, 4, 4);

            for (let i = 1; i < 4; i++)
                new FieldLocalization(cdm, 5, i);

            for (let i = 1; i < 4; i++)
                new FieldLocalization(cm, 6, i);

            new FieldLocalization(lm, 7, 0);
            new FieldLocalization(rm, 7, 4);

            for (let i = 1; i < 4; i++)
                new FieldLocalization(cam, 8, i);

            new FieldLocalization(lw, 9, 0);
            new FieldLocalization(ss, 9, 2);
            new FieldLocalization(rw, 9, 4);

            new FieldLocalization(st, 10, 1);
            new FieldLocalization(st, 10, 3);

            new FieldLocalization(cf, 11, 2);

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