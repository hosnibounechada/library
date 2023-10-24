const CustomError = require("./custom-error");

class NotFoundError extends CustomError {
  constructor(message = "Not Found") {
    super(message);
    this.statusCode = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = NotFoundError;
