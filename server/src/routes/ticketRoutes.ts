import * as express from 'express';

import * as TicketController from '../controllers/ticketController';
import { catchErrors } from '../handlers/errorHandlers';

const router = express.Router();

router.get('/', catchErrors(TicketController.getAllTickets));

router.get('/:id', catchErrors(TicketController.getTicketById));

router.get('/:id', catchErrors(TicketController.updateTicketById));

export default router;