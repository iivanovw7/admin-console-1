import express from 'express';

import * as MessageController from '../controllers/messageController';
import { catchErrors } from '../handlers/errorHandlers';

const router = express.Router();

router.get('/', catchErrors(MessageController.getAllMessages));

router.get('/:id', catchErrors(MessageController.getMessageById));

router.post('/new', catchErrors(MessageController.addNewMessage));

export default router;