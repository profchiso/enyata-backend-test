const { body } = require("express-validator")


const createUserValidation = [
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty'),
    body('email')
    .isEmail()
    .withMessage('Email must be valid')
    .notEmpty()
    .withMessage("Email field is required"),

    body('password')
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage('Password must be between 2 and 20 characters'),
]
module.exports = { createUserValidation }