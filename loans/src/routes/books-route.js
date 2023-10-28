const router = require("express").Router();
const { requestValidator } = require("../middleware");
const { idValidator } = require("../validators/id-validator");

const {
  getAllBooks,
  getAllUsersLoanedBook,
} = require("../controllers/books-controller");

router.route("/").get(getAllBooks);

router
  .route("/:book_id/users")
  .all(idValidator("book_id"), requestValidator)
  .get(getAllUsersLoanedBook);

module.exports = router;
