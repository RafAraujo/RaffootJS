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

    static bootstrapColor(name) {
        switch (name) {
            case 'primary':
                return '#007bff';
            case 'secondary':
                return '#0062cc';
            case 'success':
                return '#28a745';
            case 'danger':
                return '#dc3545';
            case 'warning':
                return '#ffc107';
            default:
                return 'red';
        }
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
    
	static createProgressBar(value, ...classList) {
		let divProgress = HtmlHelper.createElement('div', '', 'progress');
		let divProgressBar = HtmlHelper.createElement('div', value, 'progress-bar');
		divProgressBar.classList.add(...classList);
		divProgressBar.setAttribute('role', 'progressbar');
		divProgressBar.style.width = `${value}%`;
		divProgressBar.setAttribute('aria-valuenow', value);
		divProgressBar.setAttribute('aria-valuemin', 0);
		divProgressBar.setAttribute('aria-valuemax', 100);
		divProgress.appendChild(divProgressBar);
		return divProgress;
    }
    
    static createWell(innerHTML, ...classList) {
        let well = HtmlHelper.createElement('div', innerHTML, 'well');
        well.classList.add(...classList);
        return well;
    }
	
	static setTooltip(element, innerHTML) {
		element.setAttribute('data-toggle', 'tooltip');
		element.setAttribute('data-placement', 'bottom');
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

    static clearTbody(tbody) {
        Array.from(tbody.children).forEach(tr => tbody.removeChild(tr));
    }
}
