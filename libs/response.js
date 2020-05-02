module.exports = {
    success(code, message) {
        return {
            "error": false,
            "code": code,
            "message": message
        };
    },

    error(code, message) {
        return {
            "error": true,
            "code": code,
            "message": message
        };
    },

    output(code, data, count = 0) {
        return {
            "error": false,
            "code": code,
            "count": count,
            "data": data
        };
    }
};