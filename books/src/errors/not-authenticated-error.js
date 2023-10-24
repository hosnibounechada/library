const CustomError = require("./custom-error");

class NotAuthenticatedError extends CustomError {
  constructor(message = "Not Authenticated") {
    super(message);
    this.statusCode = 401;
    Object.setPrototypeOf(this, NotAuthenticatedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = NotAuthenticatedError;
