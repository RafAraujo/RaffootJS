let $ = document.querySelector.bind(document);

class HtmlHelper {
    static newSelect(label, id) {
        let html = `
            <label>${label}</label>
            <br>
            <select id="${id}"></select>
            <br>
        `;

        return html;
    }
}