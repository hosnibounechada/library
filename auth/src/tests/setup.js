require("dotenv").config({
  path: ".env.test",
});

const request = require("supertest");

const app = require("../app");
const { JWTProvider } = require("../services");

const sequelize = require("../config/database");

jest.mock("../events/publishers/user-events");

const emptyUsersTable = async () => {
  await sequelize.query("DELETE FROM users");
};

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await emptyUsersTable();
  await sequelize.close();
});

beforeEach(async () => {
  await emptyUsersTable();
});

global.register = async () => {
  await request(app)
    .post("/api/v1/auth/register")
    .send({
      first_name: "test",
      last_name: "test",
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
};

global.login = async () => {
  const userResponse = await request(app).post("/api/v1/auth/register").send({
    first_name: "test",
    last_name: "test",
    email: "test@test.com",
    password: "password",
  });

  token = JWTProvider.generateConfirmationToken({ id: userResponse.body.id });

  await request(app).get(`/api/v1/auth/account-confirmation/${token}`);

  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/v1/auth/login")
    .send({ email, password })
    .expect(200);

  const cookie = response.get("Set-Cookie");
  const { body } = response;
  const { jwt } = body;

  return [
    cookie,
    {
      accessToken: jwt.access_token,
      refreshToken: jwt.refresh_token,
    },
  ];
};
