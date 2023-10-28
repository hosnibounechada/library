const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Loan = require("./loan");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name",
    },
  },
  {
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
  }
);

User.hasMany(Loan, {
  foreignKey: "userId",
});

Loan.belongsTo(User);

module.exports = User;
