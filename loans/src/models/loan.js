const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Loan = sequelize.define(
  "loan",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "book_id",
      references: {
        model: "books",
        key: "id",
      },
    },
    loanedFrom: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "loaned_from",
    },
    loanedTo: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "loaned_to",
    },
  },
  {
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
  }
);

Loan.associate = (models) => {
  Loan.belongsTo(models.User, {
    foreignKey: "userId",
  });
  Loan.belongsTo(models.Book, {
    foreignKey: "bookId",
  });
};

module.exports = Loan;
