const router = require("express").Router();
const article = require("./articles");
const user = require("./users");
const NotFoundError = require("../errors/NotFoundError");
const { signup, signin } = require("../controllers/users");
const {
  validateSignUpBody,
  validateSignInBody,
} = require("../middlewares/validation");

router.use("/articles", article);
router.use("/users", user);

router.post("/signin", validateSignInBody, signin);
router.post("/signup", validateSignUpBody, signup);

router.use("*", (req, res, next) => {
  next(new NotFoundError("Page not found"));
});

module.exports = router;
