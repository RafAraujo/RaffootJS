let $ = document.querySelector.bind(document);

class HtmlHelper {
    static newSelect(id, options) {
        let select = document.createElement('select');
        select.id = id;
        HtmlHelper.fillSelect(select, options);
        return select;
    }

    static fillSelect(select, options) {
        HtmlHelper.clearSelect(select);
        select.appendChild(new Option());
        for (let i = 0; i < options.length; i++) {
            let object = options[i];
            select.appendChild(new Option(object.name, object.id));
        }
    }
    
    static clearSelect(select) {
        select.options.length = 0;
    }
}