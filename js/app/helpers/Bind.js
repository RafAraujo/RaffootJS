class Bind {
    constructor(model, view, ...properties) {
        let proxy = ProxyFactory.create(model, properties, model => view.update(model));
        view.update(model);
        return proxy;
    }
}