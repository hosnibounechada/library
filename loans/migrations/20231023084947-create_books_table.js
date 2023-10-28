const { Sequelize } = require("sequelize");

async function up({ context: queryInterface }) {
  await queryInterface.createTable("books", {
    id: {
      type: Sequelize.INTEGER,
      // allowNull: false,
      // unique: true,
      primaryKey: true,
      autoIncrement: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isbn: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable("books");
}

module.exports = { up, down };
