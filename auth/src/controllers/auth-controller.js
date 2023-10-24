const User = require("../models/user");
const { PasswordHash, RandomGenerator, JWTProvider } = require("../services");
const {
  BadRequestError,
  InvalidCredentialsError,
  NotFoundError,
} = require("../errors");
const toCamelCase = require("../utils/to-camel-case");
const toSnakeCase = require("../utils/to-snake-case");

const register = async (req, res) => {
  const user = toCamelCase(req.body);

  const { firstName, lastName, email, password } = user;

  const userExists = await User.findOne({ where: { email } });

  if (userExists) throw new BadRequestError("Email Already Exists!");

  user.password = await PasswordHash.toHash(password);

  user.username = RandomGenerator.GenerateUsername(firstName, lastName);

  const savedUser = (await User.create(user)).get();

  delete savedUser.password;

  const { id } = savedUser;

  const confirmationUrl = JWTProvider.generateConfirmationToken({
    id,
  });

  console.log(
    `http://localhost:3000/api/v1/auth/account-confirmation/${confirmationUrl}`
  );

  res.status(201).json(toSnakeCase(savedUser));
};

const accountConfirmation = async (req, res) => {
  const { id } = req.currentUser;

  const user = await User.findByPk(id);

  if (!user) throw new NotFoundError("User not found!");

  user.verified = true;

  await user.save();

  res.status(204).send();
};

const login = async (req, res) => {
  const body = toCamelCase(req.body);

  const { email, password } = body;

  const user = await User.findOne({
    where: { email },
    attributes: { include: ["password"] },
  });

  if (!user) throw new InvalidCredentialsError();

  if (!(await PasswordHash.compare(user.password, password)))
    throw new InvalidCredentialsError();

  if (!user.verified)
    throw new InvalidCredentialsError("Account isn't verified!");

  const jsonUser = toSnakeCase(user.get());

  delete jsonUser.password;

  const accessToken = JWTProvider.generateAccessToken(jsonUser);
  const refreshToken = JWTProvider.generateRefreshToken({ id: jsonUser.id });

  jwt = {
    access_token: accessToken,
    refresh_token: refreshToken,
  };

  res.cookie("jwt", refreshToken, { httpOnly: true });

  res.status(200).json({ user: jsonUser, jwt });
};

const refresh = async (req, res) => {
  const { id } = req.currentUser;

  const user = await User.findByPk(id);

  if (!user) throw new NotFoundError("User not found!");

  const jsonUser = toSnakeCase(user.dataValues);

  delete jsonUser.password;

  const accessToken = JWTProvider.generateAccessToken(jsonUser);

  res.status(200).json({ access_token: accessToken });
};

const logout = async (_, res) => {
  res.clearCookie("jwt");

  res.status(200).send();
};

const me = async (req, res) => {
  const { id } = req.currentUser;

  const user = await User.findByPk(id);

  if (!user) throw new NotFoundError("User not found!");

  const userResponse = toSnakeCase(user.get());

  //delete userResponse.password;

  res.status(200).json(userResponse);
};

module.exports = {
  register,
  accountConfirmation,
  login,
  refresh,
  logout,
  me,
};
