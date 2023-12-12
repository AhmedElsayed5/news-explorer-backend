const router = require("express").Router();
const article = require("./articles");
const user = require("./users");
const { signup, signin } = require("../controllers/users");
const {
  validateSignUpBody,
  validateSignInBody,
} = require("../middlewares/validation");

router.use("/articles", article);
router.use("/users", user);

router.post("/signin", validateSignInBody, signin);
router.post("/signup", validateSignUpBody, signup);

module.exports = router;
