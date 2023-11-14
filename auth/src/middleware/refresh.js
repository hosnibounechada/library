const jwt = require("jsonwebtoken");
const {
  NotAuthorizedError,
} = require("@hosnibounechada/library-common/errors");
const { tokens } = require("../constants/tokens");

const refreshMiddleware = (req, _, next) => {
  let token = null;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token) throw new NotAuthorizedError();

  try {
    const payload = jwt.verify(token, tokens.refreshTokenKey);

    req.currentUser = payload;
  } catch (err) {
    console.error(err);
  }

  next();
};

module.exports = refreshMiddleware;
