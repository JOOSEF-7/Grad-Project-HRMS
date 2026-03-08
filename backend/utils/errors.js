class appErrors extends Error {
    constructor() {
        super();
    }
    create(statusCode, message, statusText) {
        const error = new appErrors();
        error.statusCode = statusCode;
        error.message = message;
        error.statusText = statusText;
        return error;
    }
}
export default new appErrors();
