const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Loan = require("./loan");

const Book = sequelize.define(
  "book",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

Book.hasMany(Loan, {
  foreignKey: "bookId",
});

Loan.belongsTo(Book);

module.exports = Book;
