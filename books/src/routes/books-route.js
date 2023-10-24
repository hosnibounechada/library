const router = require("express").Router();
const { requestValidator } = require("../middleware");
const { idValidator } = require("../validators/id-validator");

const {
  getAll,
  get,
  create,
  update,
  remove,
} = require("../controllers/books-controller");

router.route("/").get(getAll).post(create);

router
  .route("/:id")
  .all(idValidator("id"), requestValidator)
  .get(get)
  .delete(remove)
  .put(update);

module.exports = router;
