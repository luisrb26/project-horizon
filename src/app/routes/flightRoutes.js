const router = require('express').Router();
const validate = require('../validations/flightValidations');

const flightController = require('../controllers/FlightController');

router.post('/', validate.createFlight, flightController.createFlight);
router.get('/', flightController.listAllFlights);

module.exports = router;
