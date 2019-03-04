const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById, updateUserById } = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(getAllUsers));

router.get('/:id', catchErrors(getUserById));

router.put('/:id', catchErrors(updateUserById));

module.exports = router;