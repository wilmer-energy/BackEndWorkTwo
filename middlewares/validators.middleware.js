const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errMessage = errors.array().map((err) => err.msg);
    const message = errMessage.join(". ");

    return res.status(400).json({
      status: "Error",
      message,
    });
  }
  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  checkValidations,
];

const createTaskValidator = [
  body("userId")
    .isNumeric()
    .withMessage("Name must be a number")
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("title").isString().withMessage("Must provide a string"),
  body("startDate")
    .isDate()
    .withMessage("Password must be a date")
    .notEmpty()
    .withMessage("Password cannot be empty"),
  checkValidations,
];

module.exports = { createUserValidators, createTaskValidator };
