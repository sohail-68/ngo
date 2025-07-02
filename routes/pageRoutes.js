const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const {authenticate,authorizeRole} = require('../middlewares/auth');
const upload= require('../middlewares/pages');


// Create page for a menu
router.post('/', authenticate, upload.fields([
  { name: 'image', maxCount: 1 },         // Page Image
  { name: 'bannerImage', maxCount: 1 }   ]) , pageController.createPage);


// // Get single page
router.get('/:menuId', pageController.getPagesByMenu);
router.get('/', pageController.getAllPages);

router.put('/:id', upload.single('image'), pageController.updatePage);
router.delete('/:id',  pageController.deletePage);


module.exports = router;