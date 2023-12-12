const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const ConflictError = require("../errors/ConflictError");
const BadRequestError = require("../errors/BadRequestError");
const { JWT_SECRET } = require("../utils/config");

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("No user with matching ID found");
    })
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) =>
      res.send({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      }),
    )
    .catch(() => {
      next(new UnauthorizedError("Incorrect email or password"));
    });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then((data) => {
      if (data) throw new ConflictError("Email already exists");
      return bcrypt
        .hash(password, 10)
        .then((hash) => User.create({ name, email, password: hash }))
        .then((item) => {
          res.send({
            data: {
              _id: item._id,
              name: item.name,
              email: item.email,
            },
            token: jwt.sign({ _id: item._id }, JWT_SECRET, { expiresIn: "7d" }),
          });
        })
        .catch((e) => {
          if (e.name === "ValidationError")
            next(new BadRequestError("Data is not Valid"));
          next(e);
        });
    })
    .catch((err) => next(err));
};

module.exports = {
  getCurrentUser,
  signup,
  signin,
};
