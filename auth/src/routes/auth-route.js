const router = require("express").Router();
const {
  register,
  accountConfirmation,
  login,
  refresh,
  logout,
  me,
} = require("../controllers/auth-controller");
const {
  requestValidator,
  confirmationMiddleware,
  refreshMiddleware,
  requireAuth,
} = require("../middleware");
const { registerValidator } = require("../validators/user-validator");

router.post("/register", registerValidator, requestValidator, register);
router.get(
  "/account-confirmation/:token",
  confirmationMiddleware,
  accountConfirmation
);
router.post("/login", login);
router.get("/refresh", refreshMiddleware, requireAuth, refresh);
router.get("/logout", refreshMiddleware, requireAuth, logout);
router.get("/me", requireAuth, me);

module.exports = router;
