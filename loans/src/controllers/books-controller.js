const Book = require("../models/book");
const User = require("../models/user");
const Loan = require("../models/loan");
const { BadRequestError, NotFoundError } = require("../errors");
const toCamelCase = require("../utils/to-camel-case");
const toSnakeCase = require("../utils/to-snake-case");

const getAllBooks = async (_, res) => {
  const books = await Book.findAll();

  res.status(200).json(books);
};

const getAllUsersLoanedBook = async (req, res) => {
  const bookId = req.params.book_id;

  const loans = await Loan.findAll({
    where: {
      bookId: bookId,
    },
    include: [{ model: User }],
  });

  res.status(200).json(
    loans.map((loan) => {
      return {
        ...toSnakeCase(loan.user.dataValues),
        loan_id: loan.id,
        loaned_from: loan.loanedFrom,
        loaned_to: loan.loanedTo,
      };
    })
  );
};

module.exports = { getAllBooks, getAllUsersLoanedBook };
