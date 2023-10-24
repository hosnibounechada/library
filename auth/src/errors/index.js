const BadRequestError = require("./bad-request-error");
const NotFoundError = require("./not-found-error");
const RequestValidationError = require("./request-validation-error");
const InvalidCredentialsError = require("./invalid-credentials-error");
const NotAuthenticatedError = require("./not-authenticated-error");
const NotAuthorizedError = require("./not-authorized-error");

module.exports = {
  BadRequestError,
  NotFoundError,
  RequestValidationError,
  InvalidCredentialsError,
  NotAuthenticatedError,
  NotAuthorizedError,
};
