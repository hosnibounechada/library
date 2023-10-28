const Book = require("../../models/book");

const createBookHandler = async (book) => {
  await Book.create(book);
};

const updateBookHandler = async (book) => {};

const deleteBookHandler = (id) => {};

module.exports = {
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
};
