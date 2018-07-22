class NewGameView extends View {
    constructor(_element) {
        super(_element);
    }

    template() {
        return `
            ${HtmlHelper.newSelect('Country', 'countries')}
        `;
    }
}