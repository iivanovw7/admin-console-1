const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const TicketController = require('../controllers/ticketController');
const { catchErrors } = require('../handlers/errorHandlers');

// Users routes
router.get('/users/branch/:id', catchErrors(UserController.getUsersByBranchId));

router.get('/users/group/:id', catchErrors(UserController.getUsersByGroupId));

router.get('/users/:id', catchErrors(UserController.getUserById));

router.put('/:id', catchErrors(UserController.updateUserById));

// Tickets routes
router.get('/tickets/branch/:id', catchErrors(TicketController.getTicketsByBranchId));

router.get('/tickets/user/:id', catchErrors(TicketController.getTicketsByAuthorId));

router.get('/tickets/:id', catchErrors(TicketController.getTicketById));

router.put('/tickets/:id', catchErrors(TicketController.updateTicketById));

module.exports = router;