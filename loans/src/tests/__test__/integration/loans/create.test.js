require("dotenv").config({
  path: ".env.test",
});

const request = require("supertest");

const app = require("../../../../app");

it("return a 201 for successful creation", async () => {
  const token = login();

  await request(app)
    .post("/api/v1/loans")
    .set("Authorization", `Bearer ${token}`)
    .send([
      {
        id: 1,
        loanedFrom: "2023-11-01T14:30:00.000Z",
        loanedTo: "2023-11-10T14:30:00.000Z",
      },
    ])
    .expect(201);
});
