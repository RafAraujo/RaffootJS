class Html {
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
        Html.clearSelect(select);
        select.appendChild(new Option());

        for (let option of options)
            if (option instanceof Entity)
                select.appendChild(new Option(option.name, option.id));
            else
                select.appendChild(new Option(option));
    }

    static selectedOptions(select) {
        return Array.from(select.querySelectorAll('option:checked'), o => o.value);
    }

    static createElement(tagName, innerHTML, ...classList) {
        let element = document.createElement(tagName);

        if (innerHTML)
            element.innerHTML = innerHTML;

        element.classList.add(...classList);

        return element;
    }

    static createButton(innerHTML, ...classList) {
        let button = Html.createElement('button', innerHTML, 'btn');
        button.classList.add(...classList);
        return button;
    }

    static createLink(href, innerHTML, ...classList) {
        let link = Html.createElement('a', innerHTML, ...classList);
        link.setAttribute('href', href);
        return link;
    }

    static createLinkForModal(modal, innerHTML, ...classList) {
        let link = Html.createLink(`#${modal}`, innerHTML, ...classList);
        link.setAttribute('data-toggle', 'modal');
        return link;
    }

    static createIcon(name, color, ...classList) {
        let span = Html.createElement('span', '');
        let i = Html.createElement('i', '', 'fas', `fa-${name}`, ...classList);
        span.style.color = color;
        span.appendChild(i);
        return span;
    }

    static createImage(path, alt, ...classList) {
        let img = Html.createElement('img', '', ...classList);
        img.setAttribute('src', path);
        img.setAttribute('alt', alt);
        img.setAttribute('title', alt);
        img.classList.add('img-fluid');

        return img;
    }

    static createParagraph(innerHTML, ...classList) {
        let p = Html.createElement('p', innerHTML, ...classList);
        return p;
    }

    static createProgressBar(value, ...classList) {
        let divProgress = Html.createElement('div', '', 'progress');
        let divProgressBar = Html.createElement('div', value, 'progress-bar');
        divProgressBar.classList.add(...classList);
        divProgressBar.setAttribute('role', 'progressbar');
        divProgressBar.style.width = `${value}%`;
        divProgressBar.setAttribute('aria-valuenow', value);
        divProgressBar.setAttribute('aria-valuemin', 0);
        divProgressBar.setAttribute('aria-valuemax', 100);
        divProgress.setAttribute('title', value);
        divProgress.appendChild(divProgressBar);
        return divProgress;
    }

    static createTable(title, headers, ...classList) {
        let table = Html.createElement('table', '', 'table', 'table-responsive', 'table-hover');
        table.classList.add(...classList);

        let thead = Html.createElement('thead');

        if (title) {
            let tr = Html.createElement('tr');
            thead.appendChild(tr);

            let th = Html.createElement('th', title, 'text-center');
            th.setAttribute('colspan', headers.length);
            tr.appendChild(th);
        }

        let tr = Html.createElement('tr');
        thead.appendChild(tr);
        for (let header of headers) {
            let th = Html.createElement('th', header, 'text-center');
            tr.appendChild(th);
        }

        table.appendChild(thead);
        table.appendChild(Html.createElement('tbody'));
        table.appendChild(Html.createElement('tfoot'));

        return table;
    }

    static insertCell(tr, innerHTML, ...classList) {
        let td = tr.insertCell();
        td.innerHTML = innerHTML;
        td.classList.add(...classList);
        return td;
    }

    static insertCellWithTooltip(tr, innerHTML, tooltip, ...classList) {
        let span = Html.createElement('span', innerHTML);
        Html.setTooltip(span, tooltip);
        return Html.insertCell(tr, span.outerHTML, ...classList);
    }

    static hideColumn(table, columnIndex) {
        Array.from(table.children).filter(section => section != null).forEach(section => {
            Array.from(section.children).forEach(row => row.children[columnIndex].classList.add('d-none'));
        });
    }

    static setTooltip(element, innerHTML, position) {
        element.setAttribute('data-toggle', 'tooltip');
        element.setAttribute('data-placement', position || 'bottom');
        element.setAttribute('data-html', 'true');
        element.setAttribute('title', innerHTML);
        return element;
    }

    static clearElement(element) {
        Array.from(element.children).forEach(child => element.removeChild(child));
    }
}
