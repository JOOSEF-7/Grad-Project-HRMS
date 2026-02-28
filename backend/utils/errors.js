class appErrors extends Error {
  constructor() {
    super();
  }
  create(statusCode, message, statusText) {
    const error = new appErrors();
    error.message = message;
    error.statusCode = statusCode;
    error.statusText = statusText;
    return error;
  }
}
export default new appErrors();
