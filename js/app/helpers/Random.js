class Random {
    static month() {
        return Random.number(11);
    }

    static number(max) {
        return Random.numberBetween(0, max);
    }

    static numberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}