let _formations = [];

class Formation {
    constructor(name, fieldLocalizations) {
        this.name = name;
        this.fieldLocalizations = fieldLocalizations;
    }

    static seed() {
        let f = _formations;

        f.push(new Formation('3-4-1-2',        fl(['LCB ', 'CB  ', 'RCB ', 'LCM ', 'RCM ', 'LM  ', 'RM  ', 'CAM ', 'LST ', 'RST '])));
        f.push(new Formation('3-4-2-1',        fl(['LCB ', 'CB  ', 'RCB ', 'LCM ', 'RCM ', 'LM  ', 'RM  ', 'LST ', 'RST ', 'CF  '])));
        f.push(new Formation('3-4-3',          fl(['LCB ', 'CB  ', 'RCB ', 'LCM ', 'RCM ', 'LM  ', 'RM  ', 'LW  ', 'RW  ', 'CF  '])));
        f.push(new Formation('3-5-2',          fl(['LCB ', 'CB  ', 'RCB ', 'LCDM', 'RCDM', 'LM  ', 'RM  ', 'CAM ', 'LST ', 'RST '])));
        
        f.push(new Formation('4-1-2-1-2',      fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'CDM ', 'LM  ', 'RM  ', 'CAM ', 'LST ', 'RST '])));
        f.push(new Formation('4-1-2-1-2 (2)',  fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'CDM ', 'LCM ', 'RCM ', 'CAM ', 'LST ', 'RST '])));
        f.push(new Formation('4-1-4-1',        fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'CDM ', 'LCM ', 'RCM ', 'LM  ', 'RM  ', 'CF  '])));
        f.push(new Formation('4-2-2-2',        fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCDM', 'RCDM', 'LCAM', 'RCAM', 'LST ', 'RST '])));
        f.push(new Formation('4-2-3-1',        fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCDM', 'RCDM', 'LCAM', 'CAM ', 'RCAM', 'CF  '])));
        f.push(new Formation('4-2-3-1 (2)',    fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCDM', 'RCDM', 'CM  ', 'LM  ', 'RM  ', 'CF  '])));
        f.push(new Formation('4-3-1-2',        fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCM ', 'CM  ', 'RCM ', 'CAM ', 'LST ', 'RST '])));
        f.push(new Formation('4-3-2-1',        fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCM ', 'CM  ', 'RCM ', 'LM  ', 'RM  ', 'CF  '])));
        
        f.push(new Formation('4-3-3',          fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCM ', 'CM  ', 'RCM ', 'LW  ', 'RW  ', 'CF  '])));
        f.push(new Formation('4-3-3 (2)',      fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'CDM ', 'LCM ', 'RCM ', 'LW  ', 'RW  ', 'CF  '])));
        f.push(new Formation('4-3-3 (3)',      fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCDM', 'RCDM', 'CM  ', 'LW  ', 'RW  ', 'CF  '])));
        f.push(new Formation('4-3-3 (4)',      fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCM ', 'RCM ', 'CAM ', 'LW  ', 'RW  ', 'CF  '])));
        f.push(new Formation('4-3-3 (5)',      fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'CDM ', 'LCM ', 'RCM ', 'SS  ', 'LW  ', 'RW  '])));
        f.push(new Formation('4-4-1-1',        fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCM ', 'RCM ', 'LM  ', 'RM  ', 'SS  ', 'CF  '])));
        f.push(new Formation('4-4-2',          fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCM ', 'RCM ', 'LM  ', 'RM  ', 'LST ', 'RST '])));
        f.push(new Formation('4-4-2 (2)',      fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCDM', 'RCDM', 'LM  ', 'RM  ', 'LST ', 'RST '])));
        f.push(new Formation('4-5-1',          fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'CDM ', 'LM  ', 'RM  ', 'LCAM', 'RCAM', 'CF  '])));
        f.push(new Formation('4-5-1 (2)',      fl(['LCB ', 'RCB ', 'LB  ', 'RB  ', 'LCM ', 'CM  ', 'RCM ', 'LM  ', 'RM  ', 'CF  '])));
        
        f.push(new Formation('5-2-1-2',        fl(['LCB ', 'CB  ', 'RCB ', 'LWB ', 'RWB ', 'LCM ', 'RCM ', 'CAM ', 'LST ', 'RST '])));
        f.push(new Formation('5-2-2-1',        fl(['LCB ', 'CB  ', 'RCB ', 'LWB ', 'RWB ', 'LM  ', 'RM  ', 'LW  ', 'RW  ', 'CF  '])));
        f.push(new Formation('5-3-2',          fl(['LCB ', 'CB  ', 'RCB ', 'LWB ', 'RWB ', 'LCM ', 'CM  ', 'RCM ', 'LST ', 'RST '])));

        function fl(names) {
            let fieldLocalizations = FieldLocalization.all();
            return [fieldLocalizations[0]].concat(fieldLocalizations.filter(fl => names.some(n => n.trim() === fl.name)));
        }

        Object.freeze(_formations);
    }

    static all() {
        return _formations;
    }
}