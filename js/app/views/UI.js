function fillSelect(id, array) {
    let select = document.getElementById(id);
    clearSelect(select);
    select.appendChild(new Option());
    for (let i = 0; i < array.length; i++) {
        let object = array[i];
        select.appendChild(new Option(object.name, object.id));
    }
}

function clearSelect(select) {
    select.options.length = 0;
}