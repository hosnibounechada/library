require("dotenv").config({
  path: ".env.test",
});

const jwt = require("jsonwebtoken");

const sequelize = require("../config/database");

jest.mock("../events/publishers/book-events");

const emptyBooksTable = async () => {
  await sequelize.query("DELETE FROM books");
};

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await emptyBooksTable();
  await sequelize.close();
});

beforeEach(async () => {
  await emptyBooksTable();
});

global.login = () => {
  const token = jwt.sign(
    { id: 1, email: "test@test.com" },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_DURATION,
    }
  );

  return token;
};
