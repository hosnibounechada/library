const router = require("express").Router();
const { requestValidator, requireAuth } = require("../middleware");
const { idValidator } = require("../validators/id-validator");

const { getAll, get, create } = require("../controllers/loans-controller");

router.route("/").get(getAll).all(requireAuth).post(create);

router.route("/:id").all(idValidator("id"), requestValidator).get(get);

module.exports = router;
