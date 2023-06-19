

class DataVerifier {

    static isValidObject(obj = {}){
        if (!obj) {
            return false
        }
        if (obj === null) {
            return false
        }
        if (Object.keys(obj).length === 0) {
            return false
        }
        return true
    }

    static isValidArray(array) {
        if (!array) {
            return false
        }
        if (array === null) {
            return false
        }
        if (!Array.isArray(array)) {
            return false
        }
        if (array.length < 0) {
            return false
        }
        return true
    }

    static isValidString(str) {
        if (!str) {
            return false
        }
        if (str === null) {
            return false
        }
        if (str === "null") {
            return false
        }
        if (str === "") {
            return false
        }
        return true
    }
}

export default DataVerifier