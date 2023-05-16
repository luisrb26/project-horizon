const { body, param, check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// MODELS
const db = require('../db/conn');

exports.createFlight = [
  check('authorization')
    .notEmpty()
    .withMessage('É necessário informar um token de autorização')
    .custom((value, { req }) => {
      const token = req.headers.authorization.split(' ')[1]; // assuming Bearer token format
      jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
          throw new Error('Token inválido');
        }
      });
      return true;
    }),
  body('departure_time')
    .exists()
    .withMessage('departure_time is required')
    .isISO8601()
    .withMessage('departure_time must be in ISO 8601 format'),
  body('origin_id')
    .notEmpty()
    .withMessage('Origin ID is required.')
    .isInt({ min: 1 })
    .withMessage('Origin ID must be an integer greater than 0.'),
  body('destination_id')
    .notEmpty()
    .withMessage('Destination ID is required.')
    .isInt({ min: 1 })
    .withMessage('Destination ID must be an integer greater than 0.')
    .custom((value, { req }) => {
      if (parseInt(value) === parseInt(req.body.origin_id)) {
        throw new Error('Origin and destination IDs must be different.');
      }
      return true;
    }),
  body('classes')
    .exists()
    .withMessage('classes is required')
    .isArray()
    .withMessage('classes must be a list')
    .notEmpty()
    .withMessage('classes cannot be empty')
    .custom((classes) => {
      // Check if each object in the classes list is valid
      for (const cls of classes) {
        if (
          !cls.type ||
          !cls.name ||
          !cls.qty_of_seats ||
          !cls.price_per_seat
        ) {
          throw new Error(
            'classes must have fields type, name, qty_of_seats and price_per_seat'
          );
        }
        if (typeof cls.name !== 'string' || cls.name.length === 0) {
          throw new Error('name must be a non-empty string');
        }
        if (typeof cls.qty_of_seats !== 'number' || cls.qty_of_seats < 1) {
          throw new Error(
            'qty_of_seats must be a number greater than or equal to 1'
          );
        }
        if (typeof cls.price_per_seat !== 'number' || cls.price_per_seat < 0) {
          throw new Error(
            'price_per_seat must be a number greater than or equal to 0'
          );
        }
      }
      return true;
    }),
  (req, res, next) => {
    // Procura por erros de validação e armazena-os em um array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else next();
  },
];
