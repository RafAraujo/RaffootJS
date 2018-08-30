class HtmlHelper {
    constructor() {
        throw new Error('HtmlHelper.constructor');
    }

    static show(element) {
        element.classList.remove('d-none');
    }

    static hide(element) {
        element.classList.add('d-none');
    }

    static clearSelect(select) {
        select.innerHTML = '';
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

    static createElement(tagName, innerHTML, ...classList) {
        let element = document.createElement(tagName);
        element.innerHTML = innerHTML;
        element.classList.add(...classList);
        return element;
    }

    static insertCell(tr, innerHTML, ...classList) {
        let td = tr.insertCell();
        td.innerHTML = innerHTML;
        td.classList.add(...classList);
        return td;
    }

    static clearTbody(tbody) {
        Array.from(tbody.children).forEach(tr => tbody.removeChild(tr));
    }
}