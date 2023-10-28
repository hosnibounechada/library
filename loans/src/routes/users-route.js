const router = require("express").Router();
const { requestValidator } = require("../middleware");
const { idValidator } = require("../validators/id-validator");

const {
  getAllUsers,
  getAllLoanedBooksByUser,
} = require("../controllers/users-controller");

router.route("/").get(getAllUsers);

router
  .route("/:user_id/books")
  .all(idValidator("user_id"), requestValidator)
  .get(getAllLoanedBooksByUser);

module.exports = router;
