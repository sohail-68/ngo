const express = require('express');
const router = express.Router();
const { getAllUsers, makeAdmin, deleteUser } = require('../controllers/admincontroller');
const { authenticate, isAdmin } = require('../middlewares/auth');

// router.get('/users', authenticate, isAdmin, getAllUsers);
// router.patch('/users/:userId/make-admin', authenticate, isAdmin, makeAdmin);
// router.delete('/users/:userId', authenticate, isAdmin, deleteUser);

module.exports = router;