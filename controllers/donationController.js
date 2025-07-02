const Donation = require('../models/Donation');
const User = require('../models/User');

// Create Donation Record
exports.createDonation = async (req, res) => {
    try {
        const { donorName, donorEmail, amount, message, status } = req.body;

        const donation = await Donation.create({
            donorName,
            donorEmail,
            amount,
            message,
            status,
            createdBy: req.userId
        });

        res.status(201).json(donation);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Donations
exports.getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.findAll({
            include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'email'] }],
            order: [['createdAt', 'DESC']]
        });

        res.json(donations);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Single Donation
exports.getDonationById = async (req, res) => {
    try {
        const donation = await Donation.findByPk(req.params.id, {
            include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'email'] }]
        });

        if (!donation) return res.status(404).json({ message: 'Donation not found' });

        res.json(donation);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Donation
exports.updateDonation = async (req, res) => {
    try {
        const donation = await Donation.findByPk(req.params.id);

        if (!donation) return res.status(404).json({ message: 'Donation not found' });

        await donation.update(req.body);

        res.json(donation);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Donation
exports.deleteDonation = async (req, res) => {
    try {
        const donation = await Donation.findByPk(req.params.id);

        if (!donation) return res.status(404).json({ message: 'Donation not found' });

        await donation.destroy();

        res.json({ message: 'Donation record deleted successfully' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
