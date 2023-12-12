const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateSignUpBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    email: Joi.string()
      .required()
      .custom(validateEmail)
      .min(2)
      .max(30)
      .messages({
        "string.empty": 'The "email" field must be filled in',
        "string.email": 'the "email" field must be a valid url',
      }),
    password: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateSignInBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom(validateEmail)
      .min(2)
      .max(30)
      .messages({
        "string.empty": 'The "email" field must be filled in',
        "string.email": 'the "email" field must be a valid url',
      }),

    password: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateArticledBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    content: Joi.string().required().min(2).max(500).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    title: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    publishedAt: Joi.date(),

    source: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    url: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),

    urlToImage: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

module.exports.validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).messages({
      "string.hex": "'_id' does not use hexadecimal values",
      "string.length": "'_id' length is not equal to 24",
    }),
  }),
});

// module.exports.validateId = celebrate({
//   params: Joi.object().keys({
//     id: Joi.string().hex().length(24).messages({
//       "string.hex": "'_id' does not use hexadecimal values",
//       "string.length": "'_id' length is not equal to 24",
//     }),
//   }),
// });
