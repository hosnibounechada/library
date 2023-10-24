const express = require("express");
require("express-async-errors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const booksRoute = require("./routes/books-route");

const { errorHandler, currentUser } = require("./middleware");

const app = express();

app.use(bodyParser.json());

app.use(cookieParser());

app.use(logger("dev"));

app.use(currentUser);

const v1 = "/api/v1";
app.use(v1 + "/books", booksRoute);

app.use(errorHandler);

module.exports = app;
