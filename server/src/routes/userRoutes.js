const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(UserController.getAllUsers));

router.get('/:id', catchErrors(UserController.getUserById));

router.put('/:id', catchErrors(UserController.updateUserById));

module.exports = router;