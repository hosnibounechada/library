const Book = require("../models/book");
const User = require("../models/user");
const Loan = require("../models/loan");

const sequelize = require("../config/database");

const { BadRequestError, NotFoundError } = require("../errors");
const toCamelCase = require("../utils/to-camel-case");
const toSnakeCase = require("../utils/to-snake-case");

const getAll = async (_, res) => {
  const loans = await Loan.findAll();

  res.status(200).json(loans);
};

const get = async (req, res) => {
  const { id } = req.params;

  const loan = await Loan.findByPk(id);

  if (!loan) throw new NotFoundError("Book not found!");

  res.status(200).json(loan);
};

const create = async (req, res) => {
  try {
    const userId = req.currentUser.id;

    const loanRequests = req.body;

    const transaction = await sequelize.transaction();

    try {
      const loans = [];

      for (const loanRequest of loanRequests) {
        const { id, loanedFrom, loanedTo } = loanRequest;

        const book = await Book.findByPk(id);
        if (!book) {
          await transaction.rollback();

          throw new BadRequestError("Book with ID " + id + " not found.");
        }

        const loan = await Loan.create(
          {
            userId,
            bookId: book.id,
            loanedFrom,
            loanedTo,
          },
          { transaction }
        );

        loans.push(loan);
      }

      await transaction.commit();

      res.status(201).json(loans);
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAll, get, create };
