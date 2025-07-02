const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');
const {authenticate} = require('../middlewares/auth');

router.get('/stats', authenticate, dashboardController.getQuickStats);

module.exports = router;
