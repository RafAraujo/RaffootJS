let Formation = (function() {
    let _formations = [];

    return class Formation extends Entity {
        constructor(name, fieldLocalizationIds) {
            super();

            this.name = name;

            this._fieldLocalizationIds = fieldLocalizationIds;
        }

        static create(name, fieldLocalizations) {
            let formation = new Formation(name, fieldLocalizations.map(fl => fl.id));
            formation.id = _formations.push(formation);
            return formation;
        }

        static load(object) {
            let formation = new Formation();
            _formations.push(Object.assign(object, formation));
            return formation;
        }

        static seed() {
            Formation.create('3-4-1-2',        fl(['LCB ', 'CB  ', 'RCB ', 'LCM ', 'RCM ', 'LM  ', 'RM  ', 'CAM ', 'LST ', 'RST ']));
            Formation.create('3-4-2-1',        fl(['LCB ', 'CB  ', 'RCB ', 'LCM ', 'RCM ', 'LM  ', 'RM  ', 'LST ', 'RST ', 'CF  ']));
            Formation.create('3-4-3',          fl(['LCB ', 'CB  ', 'RCB ', 'LCM ', 'RCM ', 'LM  ', 'RM  ', 'LW  ', 'RW  ', 'CF  ']));
            Formation.create('3-5-2',          fl(['LCB ', 'CB  ', 'RCB ', 'LCDM', 'RCDM', 'LM  ', 'RM  ', 'CAM ', 'LST ', 'RST ']));
            
            Formation.create('4-1-2-1-2',      fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'CDM ', 'LM  ', 'RM  ', 'CAM ', 'LST ', 'RST ']));
            Formation.create('4-1-2-1-2 (2)',  fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'CDM ', 'LCM ', 'RCM ', 'CAM ', 'LST ', 'RST ']));
            Formation.create('4-1-4-1',        fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'CDM ', 'LCM ', 'RCM ', 'LM  ', 'RM  ', 'CF  ']));
            Formation.create('4-2-2-2',        fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCDM', 'RCDM', 'LCAM', 'RCAM', 'LST ', 'RST ']));
            Formation.create('4-2-3-1',        fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCDM', 'RCDM', 'LCAM', 'CAM ', 'RCAM', 'CF  ']));
            Formation.create('4-2-3-1 (2)',    fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCDM', 'RCDM', 'CM  ', 'LM  ', 'RM  ', 'CF  ']));
            Formation.create('4-3-1-2',        fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCM ', 'CM  ', 'RCM ', 'CAM ', 'LST ', 'RST ']));
            Formation.create('4-3-2-1',        fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCM ', 'CM  ', 'RCM ', 'LM  ', 'RM  ', 'CF  ']));
            
            Formation.create('4-3-3',          fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCM ', 'CM  ', 'RCM ', 'LW  ', 'RW  ', 'CF  ']));
            Formation.create('4-3-3 (2)',      fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'CDM ', 'LCM ', 'RCM ', 'LW  ', 'RW  ', 'CF  ']));
            Formation.create('4-3-3 (3)',      fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCDM', 'RCDM', 'CM  ', 'LW  ', 'RW  ', 'CF  ']));
            Formation.create('4-3-3 (4)',      fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCM ', 'RCM ', 'CAM ', 'LW  ', 'RW  ', 'CF  ']));
            Formation.create('4-3-3 (5)',      fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'CDM ', 'LCM ', 'RCM ', 'SS  ', 'LW  ', 'RW  ']));
            Formation.create('4-4-1-1',        fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCM ', 'RCM ', 'LM  ', 'RM  ', 'SS  ', 'CF  ']));
            Formation.create('4-4-2',          fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCM ', 'RCM ', 'LM  ', 'RM  ', 'LST ', 'RST ']));
            Formation.create('4-4-2 (2)',      fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCDM', 'RCDM', 'LM  ', 'RM  ', 'LST ', 'RST ']));
            Formation.create('4-5-1',          fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'CDM ', 'LM  ', 'RM  ', 'LCAM', 'RCAM', 'CF  ']));
            Formation.create('4-5-1 (2)',      fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCM ', 'CM  ', 'RCM ', 'LM  ', 'RM  ', 'CF  ']));
            
            Formation.create('5-2-1-2',        fl(['LCB ', 'CB  ', 'RCB ', 'LWB ', 'RWB ', 'LCM ', 'RCM ', 'CAM ', 'LST ', 'RST ']));
            Formation.create('5-2-2-1',        fl(['LCB ', 'CB  ', 'RCB ', 'LWB ', 'RWB ', 'LM  ', 'RM  ', 'LW  ', 'RW  ', 'CF  ']));
            Formation.create('5-3-2',          fl(['LCB ', 'CB  ', 'RCB ', 'LWB ', 'RWB ', 'LCM ', 'CM  ', 'RCM ', 'LST ', 'RST ']));

            function fl(names) {
                let fieldLocalizations = FieldLocalization.all();
                return [fieldLocalizations[0]].concat(fieldLocalizations.filter(fl => names.some(n => n.trim() === fl.name)));
            }

            Object.freeze(_formations);
        }

        static all() {
            return _formations;
        }

        get fieldLocalizations() {
            let fieldLocalizations = [];
            this._fieldLocalizationIds.forEach(flId => fieldLocalizations.push(FieldLocalization.all()[flId - 1]));
            return fieldLocalizations;
        }
    }
})();