const jwt = require("jsonwebtoken");
const { NotAuthorizedError, NotAuthenticatedError } = require("../errors");
const { tokens } = require("../constants/tokens");

const confirmationMiddleware = (req, _, next) => {
  const { token } = req.params;

  if (!token) throw new NotAuthorizedError();

  try {
    const payload = jwt.verify(token, tokens.confirmationTokenKey);
    req.currentUser = payload;
  } catch (err) {
    throw new NotAuthenticatedError();
  }

  next();
};

module.exports = confirmationMiddleware;
