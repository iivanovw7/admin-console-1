const express = require('express');
const router = express.Router();

const { getUsersByBranchId, getUsersByGroupId, getUserById, updateUserById } = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/users/branch/:id', catchErrors(getUsersByBranchId));

router.get('/users/group/:id', catchErrors(getUsersByGroupId));

router.get('/users/:id', catchErrors(getUserById));

router.put('/:id', catchErrors(updateUserById));

module.exports = router;