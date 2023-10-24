const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const accessTokenDuration = process.env.ACCESS_TOKEN_DURATION;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
const refreshTokenDuration = process.env.REFRESH_TOKEN_DURATION;
const confirmationTokenKey = process.env.CONFIRMATION_TOKEN_KEY;
const confirmationTokenDuration = process.env.CONFIRMATION_TOKEN_DURATION;

module.exports = {
  tokens: {
    accessTokenKey,
    accessTokenDuration,
    refreshTokenKey,
    refreshTokenDuration,
    confirmationTokenKey,
    confirmationTokenDuration,
  },
};
