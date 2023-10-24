const errorHandler = require("./error-handler");
const requestValidator = require("./request-validator");
const currentUser = require("./current-user");
const requireAuth = require("./require-auth");
const confirmationMiddleware = require("./account-confirmation");
const refreshMiddleware = require("./refresh");

module.exports = {
  errorHandler,
  requestValidator,
  currentUser,
  requireAuth,
  confirmationMiddleware,
  refreshMiddleware,
};
