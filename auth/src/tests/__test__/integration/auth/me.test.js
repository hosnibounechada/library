const request = require("supertest");
const app = require("../../../../app");

it("return 200 on successful retrieval of the current connected user", async () => {
  const [cookie, jwt] = await login();

  await request(app)
    .get("/api/v1/auth/me")
    .set("Cookie", cookie)
    .set("Authorization", `Bearer ${jwt.accessToken}`)
    .send({})
    .expect(200);
});
