const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/messageController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(MessageController.getAllMessages));

router.get('/:id', catchErrors(MessageController.getMessageById));

router.post('/new', catchErrors(MessageController.addNewMessage));

module.exports = router;