const { Sequelize } = require("sequelize");

async function up({ context: queryInterface }) {
  await queryInterface.createTable("loans", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      field: "user_id",
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    bookId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "book_id",
      references: {
        model: "books",
        key: "id",
      },
    },
    loanedFrom: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "loaned_from",
    },
    loanedTo: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "loaned_to",
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable("loans");
}

module.exports = { up, down };
