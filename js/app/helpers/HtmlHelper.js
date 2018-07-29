let $ = document.querySelector.bind(document);

class HtmlHelper {
    constructor() {
        throw new Error('Cannot instantiate HtmlHelper');
    }

    static show(element) {
        element.style.removeProperty('display');
    }

    static hide(element) {
        element.style.display = 'none';
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
        select.innerHTML = '';
    }
}