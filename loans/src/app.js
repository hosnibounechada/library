const express = require("express");
require("express-async-errors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const usersRoute = require("./routes/users-route");
const booksRoute = require("./routes/books-route");
const loansRoute = require("./routes/loans-route");

const { errorHandler, currentUser } = require("./middleware");

const app = express();

app.use(bodyParser.json());

app.use(cookieParser());

app.use(logger("dev"));

app.use(currentUser);

const v1 = "/api/v1";
app.use(v1 + "/loans/users", usersRoute);
app.use(v1 + "/loans/books", booksRoute);
app.use(v1 + "/loans", loansRoute);

app.use(errorHandler);

module.exports = app;
