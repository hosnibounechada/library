const CustomError = require("./custom-error");

class InvalidCredentialsError extends CustomError {
  constructor(message = "Invalid Credentials") {
    super(message);
    this.statusCode = 401;
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = InvalidCredentialsError;
