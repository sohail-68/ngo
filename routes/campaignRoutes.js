const router = require('express').Router();
const campaignController = require('../controllers/campaignController');
const {authenticate,authorizeRole} = require('../middlewares/auth');

const upload = require('../middlewares/campaigns');
router.post('/', authenticate, authorizeRole(["admin"]), upload.single('image'),campaignController.createCampaign);
router.get('/',authenticate, campaignController.getAllCampaigns);
router.get('/:id',authenticate, campaignController.getCampaignById);
router.put('/:id', authenticate,upload.single('image'), campaignController.updateCampaign);
router.delete('/:id', authenticate, campaignController.deleteCampaign);

module.exports = router;
