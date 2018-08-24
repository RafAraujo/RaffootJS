let $ = document.querySelector.bind(document);

class HtmlHelper {
    constructor() {
        throw new Error('HtmlHelper.constructor');
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

        for (let option of options)
            if (option instanceof Entity)
                select.appendChild(new Option(option.name, option.id));
            else
                select.appendChild(new Option(option));
    }

    static clearSelect(select) {
        select.innerHTML = '';
    }
}