const PasswordHash = require("../../../../services/password-hash");

describe("PasswordHash", () => {
  describe("toHash", () => {
    it("hashes a password", async () => {
      const password = "myPassword";
      const hashedPassword = await PasswordHash.toHash(password);

      expect(hashedPassword).toBeDefined();
    });
  });

  describe("compare", () => {
    it("compares a supplied password with a stored password", async () => {
      const password = "myPassword";
      const storedPassword = await PasswordHash.toHash(password);
      const isMatch = await PasswordHash.compare(storedPassword, password);

      expect(isMatch).toBe(true);
    });
  });
});
