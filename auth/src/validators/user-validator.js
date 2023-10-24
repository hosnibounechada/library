const { body } = require("express-validator");

const firstName = body("first_name")
  .isLength({ min: 1, max: 50 })
  .trim()
  .withMessage("Invalid first name");

const lastName = body("last_name")
  .isLength({ min: 1, max: 50 })
  .trim()
  .withMessage("Invalid last name");

const username = body("username")
  .isLength({ min: 6, max: 128 })
  .withMessage("Invalid username");

const email = body("email")
  .isEmail()
  .normalizeEmail()
  .withMessage("Invalid E-mail");

const notEmail = body("email").not().exists().withMessage("Invalid Input");

const password = body("password")
  .notEmpty()
  .isLength({ min: 6, max: 50 })
  .withMessage("Invalid password");

const registerValidator = [firstName, lastName, email, password];
const updateValidator = [firstName, lastName];

module.exports = { registerValidator, updateValidator };
