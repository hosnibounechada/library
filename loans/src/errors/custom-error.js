class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  serializeErrors() {
    throw new Error("Method not implemented");
  }
}

module.exports = CustomError;
