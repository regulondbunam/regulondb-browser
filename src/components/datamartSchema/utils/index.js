export function validString(value) {
    if (typeof value === 'string' || value instanceof String) {
        return value
    }
    return ""
}

export function isValidString(value) {
    return typeof value === 'string' || value instanceof String
}

export function isValidArray(value = []) {
    if (Array.isArray(value)) {
        if (value.length > 0) {
            return true;
        }
    }
    return false;
}