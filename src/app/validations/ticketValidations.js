const { body, validationResult } = require('express-validator');
const { isAfter, isValid, isSameDay, parseISO } = require('date-fns');

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
