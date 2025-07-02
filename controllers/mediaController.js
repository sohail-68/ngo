const Media = require('../models/Media');
const User = require('../models/User');
const path = require('path');

// Upload Media
exports.uploadMedia = async (req, res) => {
   try {
        if (!req.file) return res.status(400).json({ message: 'File is required' });

        const media = await Media.create({
            title: req.body.title || req.file.originalname,
            url: `http://localhost:5000/uploads/media/${req.file.filename}`,
            type: req.body.type || 'image',
            createdBy: req.userId
        });

        res.json(media);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Get All Media Files
exports.getAllMedia = async (req, res) => {
    try {
        const files = await Media.findAll({
            include: [{ model: User, as: 'creator', attributes: ['id', 'name'] }],
            order: [['createdAt', 'DESC']]
        });

        res.json(files);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Media
exports.deleteMedia = async (req, res) => {
    try {
        const file = await Media.findByPk(req.params.id);
        if (!file) return res.status(404).json({ message: 'Media not found' });

        await file.destroy();

        res.json({ message: 'Media deleted successfully' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
