// Utility functions
const Utils = {
    // Capitalize first letter
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    // Generate random ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Get nested object value by path
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    },

    // Set nested object value by path
    setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => {
            if (!current[key]) current[key] = {};
            return current[key];
        }, obj);
        target[lastKey] = value;
        return obj;
    },

    // Deep clone
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    // Format date
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Format time
    formatTime(date) {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Truncate string
    truncate(str, length = 50) {
        if (str.length <= length) return str;
        return str.substring(0, length) + '...';
    },

    // Escape HTML
    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    // Check if object is empty
    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    },

    // Group array by key
    groupBy(array, key) {
        return array.reduce((result, item) => {
            const groupKey = item[key];
            if (!result[groupKey]) result[groupKey] = [];
            result[groupKey].push(item);
            return result;
        }, {});
    }
};