require("dotenv").config({
  path: ".env.test",
});

const jwt = require("jsonwebtoken");

const sequelize = require("../config/database");

const emptyLoansTable = async () => {
  await sequelize.query("DELETE FROM loans");
};

beforeAll(async () => {
  await sequelize.sync();
  await sequelize.query(
    "INSERT INTO users(id, first_name, last_name) VALUES(1, 'test', 'test')"
  );
  await sequelize.query(
    "INSERT INTO books(id, title, description, isbn) VALUES(1, 'Book Title', 'Book Description', 'book-isbn')"
  );
});

afterAll(async () => {
  await emptyLoansTable();
  await sequelize.close();
});

beforeEach(async () => {
  await emptyLoansTable();
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
