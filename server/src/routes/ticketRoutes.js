const express = require('express');
const router = express.Router();

const TicketController = require('../controllers/ticketController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(TicketController.getAllTickets));

router.get('/:id', catchErrors(TicketController.getTicketById));

router.get('/:id', catchErrors(TicketController.updateTicketById));

module.exports = router;