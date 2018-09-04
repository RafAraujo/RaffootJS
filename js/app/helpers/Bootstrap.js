let Bootstrap = (function () {

    const BLUE = '#007bff';
    const GRAY = '#6c757d';
    const GREEN = '#28a745';
    const ORANGE = '#fd7e14';
    const PURPLE = '#6f42c1';
    const RED = '#dc3545';
    const YELLOW = '#ffc107';

    return class Bootstrap {
        static blue() {
            return {
                color: BLUE,
                class: 'primary'
            };
        }

        static gray() {
            return {
                color: GRAY,
                class: 'secondary'
            };
        }

        static green() {
            return {
                color: GREEN,
                class: 'success'
            };
        }

        static orange() {
            return {
                color: ORANGE,
                class: ''
            };
        }

        static purple() {
            return {
                color: PURPLE,
                class: ''
            };
        }

        static red() {
            return {
                color: RED,
                class: 'danger'
            };
        }

        static yellow() {
            return {
                color: YELLOW,
                class: 'warning'
            };
        }
    }
})();