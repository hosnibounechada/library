const CustomError = require("./custom-error");

class RequestValidationError extends CustomError {
  constructor(errors) {
    super("Invalid request params");
    this.errors = errors;
    this.statusCode = 400;

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}

module.exports = RequestValidationError;
