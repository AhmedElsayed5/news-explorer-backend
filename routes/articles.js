const router = require("express").Router();

const {
  validateArticledBody,
  validateArticleId,
} = require("../middlewares/validation");
const {
  getArticles,
  saveArticle,
  deleteArticle,
} = require("../controllers/articles");

const auth = require("../middlewares/auth");

router.get("/", auth, getArticles);
router.post("/", auth, validateArticledBody, saveArticle);
router.delete("/:articleId", auth, validateArticleId, deleteArticle);
module.exports = router;
