const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById } = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/users', catchErrors(getAllUsers));

router.get('/users/:id', getUserById);

module.exports = router;