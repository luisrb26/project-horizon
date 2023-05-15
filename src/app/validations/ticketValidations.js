const { body, validationResult } = require('express-validator');
const { isAfter, isValid, isSameDay, parseISO } = require('date-fns');
const { validate } = require('gerador-validador-cpf');

exports.findTickets = [
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
  body('date')
    .notEmpty()
    .withMessage('Date is required.')
    .custom((value) => {
      const parsedDate = parseISO(value);
      if (!isValid(parsedDate)) {
        throw new Error('Invalid date format.');
      }
      if (
        !isAfter(parsedDate, new Date()) &&
        !isSameDay(parsedDate, new Date())
      ) {
        throw new Error('Date must be greater or equal than the current date.');
      }
      return true;
    }),
  (req, res, next) => {
    // Find for validations erros and store then in an array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else next();
  },
];

exports.buyTickets = [
  body('buyers')
    .isArray({ min: 1 })
    .withMessage('Buyers must be an array with at least one element'),
  body('buyers.*.first_name')
    .isString()
    .notEmpty()
    .withMessage('First name is required'),
  body('buyers.*.last_name')
    .isString()
    .notEmpty()
    .withMessage('Last name is required'),
  body('buyers.*.email').isEmail().withMessage('Invalid email address'),
  body('buyers.*.cpf')
    .notEmpty()
    .withMessage('CPF is required')
    .isLength({ min: 11, max: 11 })
    .withMessage('CPF must have 11 digits')
    .matches(/^[0-9]+$/)
    .withMessage('CPF must contain only digits')
    .custom((value) => {
      if (!validate(value)) {
        throw new Error('Invalid CPF');
      }
      return true;
    }),
  body('buyers.*.birth_date').isISO8601().withMessage('Invalid birth date'),
  body('buyers.*.sex').isString().notEmpty().withMessage('Sex is required'),
  body('buyers.*.tickets')
    .isArray({ min: 1 })
    .withMessage('Tickets must be an array with at least one element'),
  body('buyers.*.tickets.*.flight_id')
    .isInt({ min: 1 })
    .withMessage('Flight ID must be a positive integer'),
  body('buyers.*.tickets.*.flight_class_id')
    .isInt({ min: 1 })
    .withMessage('Flight class ID must be a positive integer'),
  body('buyers.*.tickets.*.baggage')
    .optional()
    .isInt({ min: 0, max: 2 })
    .withMessage('Baggage must be an integer between 0 and 2'),
  body('buyers.*.tickets.*.seat')
    .isInt({ min: 1 })
    .withMessage('Seat ID must be a positive integer'),
  (req, res, next) => {
    // Find for validations erros and store then in an array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else next();
  },
];
