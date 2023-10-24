const CustomError = require("./custom-error");

class NotAuthorizedError extends CustomError {
  constructor(message = "Not Authorized") {
    super(message);
    this.statusCode = 403;
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = NotAuthorizedError;
