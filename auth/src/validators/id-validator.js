const { param } = require("express-validator");

const idValidator = (input) => {
  return [param(input).isInt().withMessage("Invalid id, must be an integer")];
};

module.exports = { idValidator };
