const { body, param, check, validationResult } = require('express-validator');
const db = require('../db/conn');
require('dotenv').config();

// MODELS
const Manager = db.managers;

exports.createAdmin = [
  body('username')
    .notEmpty()
    .withMessage('Username cannot be empty.')
    .custom(async (username) => {
      const usernameexists = await Manager.findOne({ where: { username } });
      if (usernameexists) {
        throw new Error('This username already exists!');
      }
    }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  (req, res, next) => {
    // Find for validations erros and store then in an array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else next();
  },
];
