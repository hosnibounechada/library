const { validationResult } = require("express-validator");
const { RequestValidationError } = require("../errors");

const requestValidator = (req, _, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  next();
};

module.exports = requestValidator;
