const router = require('express').Router();

const flightController = require('../controllers/FlightController');

router.post('/', flightController.createFlight);
router.get('/', flightController.listAllFlights);

module.exports = router;
