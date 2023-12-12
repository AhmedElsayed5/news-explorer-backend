const Article = require("../models/article");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");
const BadRequestError = require("../errors/BadRequestError");

const getArticles = (req, res, next) => {
  Article.find({ owner: req?.user?._id })
    .then((item) => res.send(item))
    .catch((err) => {
      next(err);
    });
};

const saveArticle = (req, res, next) => {
  const {
    keyword,
    content: text,
    title,
    publishedAt: date,
    source,
    url: link,
    urlToImage: image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req?.user?._id,
  })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Data is not Valid"));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId)
    .orFail(() => {
      throw new NotFoundError("No article with matching ID found");
    })
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        throw new ForbiddenError("You are not authorized to delete this item");
      }

      return item.deleteOne().then(() => {
        res.send({ message: "Article deleted" });
      });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = { getArticles, saveArticle, deleteArticle };
