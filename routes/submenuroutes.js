const express = require('express');
const router = express.Router();
const {authenticate} = require('../middlewares/auth');

const submenuController = require('../controllers/submenuController');

// ➕ Create Submenu
router.post('/', authenticate, submenuController.createSubmenu);

module.exports = router;