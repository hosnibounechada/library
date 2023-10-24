const RandomGenerator = require("../../../../services/username-generator");

describe("Random Generator", () => {
  describe("Generate Username", () => {
    it("should generate a username based on first and last name", () => {
      const firstName = "John";
      const lastName = "Doe";
      const username = RandomGenerator.GenerateUsername(firstName, lastName);

      expect(username).toMatch(/John_Doe\d{4}/);
    });
  });

  describe("randomInt", () => {
    it("should generate a random integer between min and max", () => {
      const min = 1;
      const max = 100;
      const randomValue = RandomGenerator.randomInt(min, max);

      expect(Number.isInteger(randomValue)).toBe(true);

      expect(randomValue).toBeGreaterThanOrEqual(min);

      expect(randomValue).toBeLessThanOrEqual(max);
    });
  });
});
