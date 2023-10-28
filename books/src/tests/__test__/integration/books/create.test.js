require("dotenv").config({
  path: ".env.test",
});

const request = require("supertest");

const app = require("../../../../app");

it("return a 201 for successful creation", async () => {
  const token = login();

  await request(app)
    .post("/api/v1/books")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "book title",
      description: "book description",
      isbn: "book-isbn",
    })
    .expect(201);
});
