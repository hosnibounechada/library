const request = require("supertest");
const app = require("../../../../app");

// it("assert 1 + 1 = 2", () => {
//   const result = 1 + 1;
//   expect(result).toBe(2);
// });

it("return a 201 on successful signup", async () => {
  await request(app)
    .post("/api/v1/auth/register")
    .send({
      first_name: "test",
      last_name: "test",
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("return a 400 on unsuccessful signup", async () => {
  await request(app)
    .post("/api/v1/auth/register")
    .send({
      first_name: "test",
      last_name: "test",
      email: "test.test.com",
      password: "pass",
    })
    .expect(400);
});
