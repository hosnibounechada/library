const {
  NotAuthorizedError,
} = require("@hosnibounechada/library-common/errors");

const requireAuth = (req, _, next) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};

module.exports = requireAuth;
