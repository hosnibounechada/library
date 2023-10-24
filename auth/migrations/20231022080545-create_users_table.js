const { Sequelize } = require("sequelize");

async function up({ context: queryInterface }) {
  //   await queryInterface.sequelize.query(`
  //   CREATE TABLE IF NOT EXISTS users (
  //     id SERIAL PRIMARY KEY,
  //     first_name VARCHAR(255) NOT NULL,
  //     last_name VARCHAR(255) NOT NULL,
  //     username VARCHAR(255) NOT NULL,
  //     email VARCHAR(255) NOT NULL,
  //     password VARCHAR(255) NOT NULL,
  //     verified BOOLEAN DEFAULT false,
  //     CONSTRAINT users_email_key UNIQUE (email),
  //     CONSTRAINT users_username_key UNIQUE (username)
  //   );
  // `);
  await queryInterface.createTable("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable("users");
}

module.exports = { up, down };
