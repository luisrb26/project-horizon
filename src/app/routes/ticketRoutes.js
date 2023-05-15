const router = require('express').Router();
const validate = require('../validations/ticketValidations');

const TicketController = require('../controllers/TicketController');

router.get('/find', validate.findTickets, TicketController.findTickets);
router.post('/buy', validate.buyTickets, TicketController.buyTickets);

module.exports = router;
