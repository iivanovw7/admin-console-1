import express from 'express';

import * as UserController from '../controllers/userController';
import * as TicketController from '../controllers/ticketController';
import * as MessageController from '../controllers/messageController';
import { catchErrors } from '../handlers/errorHandlers';

const router = express.Router();

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

// Messages routes
router.get('/messages/branch/:id', catchErrors(MessageController.getMessagesByBranchId));

router.get('/messages/group/:id', catchErrors(MessageController.getMessagesByGroupId));

router.get('/messages/user/:id', catchErrors(MessageController.getMessagesBySenderId));

router.get('/messages/:id', catchErrors(MessageController.getMessageById));

router.post('/messages/new', catchErrors(MessageController.addNewMessage));

export default router;