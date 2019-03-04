const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById } = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(getAllUsers));

router.get('/:id', getUserById);

module.exports = router;