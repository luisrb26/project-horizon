const router = require('express').Router();

const flightController = require('../controllers/FlightController');

router.post('/', flightController.createFlight);

module.exports = router;
