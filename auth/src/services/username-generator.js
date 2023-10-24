const crypto = require("crypto");

class RandomGenerator {
  static GenerateUsername(firstName, lastName) {
    const uuid = crypto.randomInt(1000, 9999);
    const prefix = `${firstName}_${lastName}`;
    return `${prefix.replace(/\s/g, "")}${uuid}`;
  }

  static randomInt(min, max) {
    return crypto.randomInt(min, max);
  }
}

module.exports = RandomGenerator;
