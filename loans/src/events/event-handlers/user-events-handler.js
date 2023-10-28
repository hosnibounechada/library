const User = require("../../models/user");

const createUserHandler = async (user) => {
  await User.create(user);
};

const updateUserHandler = async (user) => {};

const deleteUserHandler = (id) => {};

module.exports = {
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
