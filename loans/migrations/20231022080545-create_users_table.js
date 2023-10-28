const { Sequelize } = require("sequelize");

async function up({ context: queryInterface }) {
  await queryInterface.createTable("users", {
    id: {
      type: Sequelize.INTEGER,
      // allowNull: false,
      // unique: true,
      primaryKey: true,
      autoIncrement: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "last_name",
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable("users");
}

module.exports = { up, down };
