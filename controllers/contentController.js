const Content = require('../models/Content');
const User = require('../models/User');

// Create or Update Content
exports.createOrUpdateContent = async (req, res) => {
    try {
        const { key, title, content } = req.body;

        let record = await Content.findOne({ where: { key } });

        if (record) {
            await record.update({ title, content });
        } else {
            record = await Content.create({
                key,
                title,
                content,
                createdBy: req.userId
            });
        }

        res.json(record);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Content by Key
exports.getContentByKey = async (req, res) => {
    try {
        const record = await Content.findOne({
            where: { key: req.params.key },
            include: [{ model: User, as: 'creator', attributes: ['id', 'name'] }]
        });

        if (!record) return res.status(404).json({ message: 'Content not found' });

        res.json(record);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Content List
exports.getAllContent = async (req, res) => {
    try {
        const records = await Content.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.json(records);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
