const request = require("supertest");
const app = require("../../../../app");

// it("assert 1 + 1 = 2", () => {
//   const result = 1 + 1;
//   expect(result).toBe(2);
// });

it("return a 401 on unsuccessful login for non registered user", async () => {
  const response = await request(app)
    .post("/api/v1/auth/login")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(401);

  expect(response.body.errors).toBeDefined();
  expect(response.body.errors).toHaveLength(1);
  expect(response.body.errors[0].message).toBe("Invalid Credentials");
});

it("return a 401 on unsuccessful login for unconfirmed account", async () => {
  await register();

  const response = await request(app)
    .post("/api/v1/auth/login")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(401);

  expect(response.body.errors).toBeDefined();
  expect(response.body.errors).toHaveLength(1);
  expect(response.body.errors[0].message).toBe("Account isn't verified!");
});

it("return a 200 on successful login", async () => {
  await login();
});
