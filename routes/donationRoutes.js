const router = require('express').Router();
const donationController = require('../controllers/donationController');
const {authenticate} = require('../middlewares/auth');


// Create Donation Record
router.post('/', authenticate, donationController.createDonation);

// Get All Donations
router.get('/', donationController.getAllDonations);

// Get Single Donation by ID
router.get('/:id', donationController.getDonationById);

// Update Donation (status change)
router.put('/:id', authenticate, donationController.updateDonation);

// Delete Donation Record
router.delete('/:id', authenticate, donationController.deleteDonation);

module.exports = router;
