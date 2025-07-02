const router = require('express').Router();
const contentController = require('../controllers/contentController');
const {authenticate} = require('../middlewares/auth');

// Create or Update Content by Key
router.post('/', authenticate, contentController.createOrUpdateContent);

// Get Content by Key
router.get('/:key', contentController.getContentByKey);

// Get All Content List
router.get('/', authenticate, contentController.getAllContent);

module.exports = router;
