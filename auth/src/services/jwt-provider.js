const jwt = require("jsonwebtoken");
const { tokens } = require("../constants/tokens");

function generateAccessToken(payload) {
  const token = jwt.sign(payload, tokens.accessTokenKey, {
    expiresIn: tokens.accessTokenDuration,
  });

  return token;
}

function generateRefreshToken(payload) {
  const token = jwt.sign(payload, tokens.refreshTokenKey, {
    expiresIn: tokens.refreshTokenDuration,
  });

  return token;
}

function generateConfirmationToken(payload) {
  const token = jwt.sign(payload, tokens.confirmationTokenKey, {
    expiresIn: tokens.confirmationTokenDuration,
  });

  return token;
}

module.exports = {
  JWTProvider: {
    generateAccessToken,
    generateRefreshToken,
    generateConfirmationToken,
  },
};
