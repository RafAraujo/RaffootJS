let $ = document.querySelector.bind(document);

class HtmlHelper {
    static append(container, element) {
        return container.appendChild(element);
    }

    static create(tagName, id = null, className = null) {
        let element = document.createElement(tagName);
        if (id != null) element.id = id;
        HtmlHelper.addClass(element, className);
        return element;
    }

    static lineBreak(container) {
        HtmlHelper.append(container, document.createElement('br'));
    }

    static horizontalLine(container) {
        HtmlHelper.append(container, document.createElement('hr'));
    }

    static select(container, id, options, labelText = null, className = null) {
        let select = HtmlHelper.create('select', id, className);
        
        HtmlHelper.fillSelect(select, options);

        if (labelText != null) {
            let label = HtmlHelper.create('label', null, className);
            label.innerText = labelText;
            label.htmlFor = select.id;
            HtmlHelper.append(container, label);
            HtmlHelper.lineBreak(container);
        }

        HtmlHelper.append(container, select);
    }

    static fillSelect(select, options) {
        HtmlHelper.clearSelect(select);
        HtmlHelper.append(select, new Option());

        for (let i = 0; i < options.length; i++) {
            let object = options[i];
            HtmlHelper.append(select, new Option(object.name, object.id));
        }
    }
    
    static clearSelect(select) {
        select.options.length = 0;
    }

    static addClass(element, className) {
        if (className != null)
            element.classList.add(className);
    }

    static remove(...elements) {
        elements.forEach(e => { if (e != null) e.remove() });
    }
}