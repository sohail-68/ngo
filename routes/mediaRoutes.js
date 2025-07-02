const router = require('express').Router();
const mediaController = require('../controllers/mediaController');
const {authenticate} = require('../middlewares/auth');
const upload = require('../middlewares/mediaUpload');

// Upload Media File
router.post('/', authenticate, upload.single('file'), mediaController.uploadMedia);

// Get All Media Files
router.get('/', mediaController.getAllMedia);

// Delete Media
router.delete('/:id', authenticate, mediaController.deleteMedia);

module.exports = router;
