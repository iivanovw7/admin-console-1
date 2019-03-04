const express = require('express');
const router = express.Router();

const { getUsersByBranchId, getUsersByGroupId, getUserById } = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/users/branch/:id', catchErrors(getUsersByBranchId));

router.get('/users/group/:id', catchErrors(getUsersByGroupId));

router.get('/users/:id', getUserById);

module.exports = router;