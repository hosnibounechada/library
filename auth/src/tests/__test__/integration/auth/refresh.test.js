const request = require("supertest");
const app = require("../../../../app");

it("return a 200 on successful request for new access token", async () => {
  const [cookie] = await login();

  await request(app)
    .get("/api/v1/auth/refresh")
    .set("Cookie", cookie)
    .send({})
    .expect(200);
});
