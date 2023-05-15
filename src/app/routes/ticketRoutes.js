const router = require('express').Router();

const TicketController = require('../controllers/TicketController');

router.get('/find', TicketController.findTickets);

module.exports = router;
