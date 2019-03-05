import express from 'express';

import * as UserController from '../controllers/userController';
import { catchErrors } from '../handlers/errorHandlers';

const router = express.Router();

router.get('/', catchErrors(UserController.getAllUsers));

router.get('/:id', catchErrors(UserController.getUserById));

router.put('/:id', catchErrors(UserController.updateUserById));

export default router;