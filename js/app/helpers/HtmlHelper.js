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

        options.forEach(option => {
            if (option instanceof Entity)
                select.appendChild(new Option(option.name, option.id));
            else
                select.appendChild(new Option(option));
        });
    }

    static selectedOptions(select) {
        return Array.from(select.querySelectorAll('option:checked'), o => o.value);
    }

    static createElement(tagName, innerHTML, ...classList) {
        let element = document.createElement(tagName);

        if (innerHTML)
            element.innerHTML = innerHTML;

        if (classList.length > 0)
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
        let table = Html.createElement('table', '', 'table', 'table-hover');
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
        headers.forEach(header => {
            let th = Html.createElement('th', header, 'text-center');
            tr.appendChild(th);
        });

        table.appendChild(thead);
        table.appendChild(Html.createElement('tbody'));
        table.appendChild(Html.createElement('tfoot'));

        return table;
    }

    static insertCell(tr, innerHTML, ...classList) {
        let td = tr.insertCell();
        td.innerHTML = innerHTML;
        if (classList.length > 0)
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
            Array.from(section.children).forEach(row => {
                let cell = row.children[columnIndex];
                Array.from(cell.classList).forEach(className => {
                    if (className.startsWith('d-'))
                        cell.classList.remove(className);
                });
                cell.classList.add('d-none');
            });
        });
    }

    static deleteColumn(table, columnIndex) {
        Array.from(table.children).filter(section => section != null).forEach(section => {
            Array.from(section.children).forEach(row => {
                Array.from(row.children).forEach((cell, index) => {
                    if (index === columnIndex)
                        row.removeChild(cell);
                });
            });
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
        element.innerHTML = '';
    }

    static formatCellPlayerCondition(td, condition) {
        let icon = null;
        let tooltipIcon = null;

        switch (condition) {
            case 1:
                icon = Html.createIcon('angle-double-down', PURPLE, 'fa-lg');
                tooltipIcon = Html.createIcon('tired', 'gold', 'fa-2x');
                break;
            case 2:
                icon = Html.createIcon('angle-down', BLUE, 'fa-lg');
                tooltipIcon = Html.createIcon('frown', 'gold', 'fa-2x');
                break;
            case 3:
                icon = Html.createIcon('angle-right', GREEN, 'fa-lg');
                tooltipIcon = Html.createIcon('meh-blank', 'gold', 'fa-2x');
                break;
            case 4:
                icon = Html.createIcon('angle-up', ORANGE, 'fa-lg');
                tooltipIcon = Html.createIcon('smile', 'gold', 'fa-2x');
                break;
            case 5:
                icon = Html.createIcon('angle-double-up', RED, 'fa-lg');
                tooltipIcon = Html.createIcon('grin-squint', 'gold', 'fa-2x');
                break;
        }

        td.innerHTML = '';
        td.appendChild(icon);
        Html.setTooltip(td, tooltipIcon.outerHTML, 'right', 'fa-lg');
    }
}
