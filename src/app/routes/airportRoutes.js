const router = require('express').Router();

const airportController = require('../controllers/AiportController');

router.get('/all', airportController.listAll);

module.exports = router;
