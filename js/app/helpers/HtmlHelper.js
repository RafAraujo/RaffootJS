class HtmlHelper {
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
        if (classList.length > 0)
            element.classList.add(...classList);
        return element;
    }

    static createProgressBar(value, ...classList) {
        let divProgress = HtmlHelper.createElement('div', '', 'progress');
        let divProgressBar = HtmlHelper.createElement('div', value, 'progress-bar');
        divProgressBar.classList.add(...classList);
        divProgressBar.setAttribute('role', 'progressbar');
        divProgressBar.style.width = `${value}%`;
        divProgressBar.setAttribute('aria-valuenow', value);
        divProgressBar.setAttribute('aria-valuemin', 0);
        divProgressBar.setAttribute('aria-valuemax', 100);
        HtmlHelper.setTooltip(divProgress, value);
        divProgress.appendChild(divProgressBar);
        return divProgress;
    }

    static setTooltip(element, innerHTML, position) {
        element.setAttribute('data-toggle', 'tooltip');
        element.setAttribute('data-placement', position || 'bottom');
        element.setAttribute('data-html', 'true');
        element.setAttribute('title', innerHTML);
        return element;
    }

    static insertCell(tr, innerHTML, ...classList) {
        let td = tr.insertCell();
        td.innerHTML = innerHTML;
        td.classList.add(...classList);
        return td;
    }

    static insertCellWithTooltip(tr, innerHTML, tooltip, ...classList) {
        let span = HtmlHelper.createElement('span', innerHTML);
        HtmlHelper.setTooltip(span, tooltip);
        return HtmlHelper.insertCell(tr, span.outerHTML, ...classList);
    }

    static icon(name, color, ...classList) {
        let span = HtmlHelper.createElement('span', '');
        let i = HtmlHelper.createElement('i', '', 'fas', `fa-${name}`, ...classList);
        span.style.color = color;
        span.appendChild(i);
        return span;
    }

    static clearTbody(tbody) {
        Array.from(tbody.children).forEach(tr => tbody.removeChild(tr));
    }
}
