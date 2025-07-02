const express = require('express');
const router = express.Router();
const upload = require('../middlewares/slider');
const sliderController = require('../controllers/sliderController');
const { authenticate, authorizeRole } = require('../middlewares/auth');

router.get('/', sliderController.getAllSliders);
router.get('/:id', sliderController.getSliderById);
router.post('/', authenticate,authorizeRole(["admin"]), upload.single('image'), sliderController.createSlider);
router.put('/:id', authenticate,authorizeRole(["admin"]), upload.single('image'), sliderController.updateSlider);
router.delete('/:id', authenticate, sliderController.deleteSlider);

module.exports = router;
