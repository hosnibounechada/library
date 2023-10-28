const jwt = require("jsonwebtoken");
const { tokens } = require("../constants/tokens");

const currentUser = (req, _, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next();
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const payload = jwt.verify(token, tokens.accessTokenKey);

    req.currentUser = payload;
  } catch (err) {
    console.error(err);
  }

  next();
};

module.exports = currentUser;
