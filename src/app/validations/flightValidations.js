const { body, param, check, validationResult } = require('express-validator');
require('dotenv').config();

// MODELS
const db = require('../db/conn');
const User = db.usuarios;

exports.createFlight = [
  body('flight_number'),
  body('departure_time'),
  body('origin_id'),
  body('destination_id'),

  (req, res, next) => {
    // Procura por erros de validação e armazena-os em um array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else next();
  },
];
