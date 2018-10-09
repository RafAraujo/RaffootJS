class PlayerEnergy {
    constructor(value) {
        this.value = value;
    }

    get status() {
        if (this.value > 66)
            return 'high';
        else if (this.value > 33)
            return 'medium';
        else
            return 'low';
    }

    get color() {
        switch (this.status) {
            case 'high':
                return { value: GREEN, class: 'success' };
            case 'medium':
                return { value: YELLOW, class: 'warning' };
            case 'low':
                return { value: RED, class: 'danger' };
        }
    }
}