const Book = require("../models/book");
const { BadRequestError, NotFoundError } = require("../errors");
const toCamelCase = require("../utils/to-camel-case");
const toSnakeCase = require("../utils/to-snake-case");

const getAll = async (_, res) => {
  const books = await Book.findAll();

  res.status(200).json(books);
};

const get = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findByPk(id);

  if (!book) throw new NotFoundError("Book not found!");

  res.status(200).json(book);
};

const create = async (req, res) => {
  const body = toCamelCase(req.body);

  const { isbn } = body;

  const bookExists = await Book.findOne({ where: { isbn } });

  if (bookExists) throw new BadRequestError("ISBN Already Exists!");

  const book = (await Book.create(body)).get();

  res.status(201).json(toSnakeCase(book));
};

const update = async (req, res) => {
  const { id } = req.params;

  const { title, description, isbn } = req.body;

  const book = await Book.findByPk(id);

  if (!book) throw new NotFoundError("Book not found!");

  book.title = title;
  book.description = description;
  book.isbn = isbn;

  const updatedBook = await book.save();

  res.status(200).json(updatedBook);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findByPk(id);

  if (!book) throw new NotFoundError("Book not found!");

  await book.destroy();

  res.status(204).send();
};

module.exports = { getAll, get, create, update, remove };
