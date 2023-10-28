const User = require("../models/user");
const Book = require("../models/book");
const Loan = require("../models/loan");
const { BadRequestError, NotFoundError } = require("../errors");
const toCamelCase = require("../utils/to-camel-case");
const toSnakeCase = require("../utils/to-snake-case");

const getAllUsers = async (_, res) => {
  const users = await User.findAll();

  res.status(200).json(users);
};

const getAllLoanedBooksByUser = async (req, res) => {
  const userId = req.params.user_id;

  const loans = await Loan.findAll({
    where: {
      userId: userId,
    },
    include: [{ model: Book }],
  });

  res.status(200).json(
    loans.map((loan) => {
      return {
        ...toSnakeCase(loan.book.dataValues),
        loan_id: loan.id,
        loaned_from: loan.loanedFrom,
        loaned_to: loan.loanedTo,
      };
    })
  );
};

module.exports = { getAllUsers, getAllLoanedBooksByUser };
