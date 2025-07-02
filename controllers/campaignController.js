const slugify  = require('slugify');
const Campaign = require('../models/Campaign');
const User = require('../models/User');

exports.createCampaign = async (req, res) => {
    try {
        const { title, description, goalAmount, startDate, endDate, category,  } = req.body;
console.log(title);

        // Basic Field Validations
        if (!title || !description || !goalAmount || !startDate || !endDate ) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }

        // Generate Slug
        const slug = slugify(title, { lower: true, strict: true });

        // Check for existing slug (optional, DB unique constraint also works)
        const existing = await Campaign.findOne({ where: { slug } });
        if (existing) return res.status(409).json({ error: 'Campaign with similar title already exists' });

        // Full Image URL Logic
        let imageUrl = null;
        if (req.file) {
            imageUrl = `http://localhost:5000/uploads/campaigns/${req.file.filename}`;
        }

        // Create Campaign
        const newCampaign = await Campaign.create({
            title,
            description,
            goalAmount,
            startDate,
            endDate,
            category: category || 'general',
            createdBy:req.user.id,
            slug,
            imageUrl
        });

        res.status(201).json({
            message: 'Campaign created successfully',
            campaign: newCampaign
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }

};

exports.getAllCampaigns = async (req, res) => {
   try {
        const campaigns = await Campaign.findAll(
          { include: [{ model: User, as: 'creator', attributes: ['id', 'username', 'email'] }],
            order: [['createdAt', 'DESC']]}

        );
        res.json(campaigns);
    } 
    
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findByPk(req.params.id, {
            include: [{ model: User, as: 'creator', attributes: ['id', 'username', 'email'] }]
        });

        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

        res.json(campaign);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCampaign = async (req, res) => {
 try {
        const campaign = await Campaign.findByPk(req.params.id)
        console.log(campaign,"campa");
        ;
        if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

        // if (req.file && campaign.imageUrl) {
        //     fs.unlinkSync(path.join(__dirname, '..', campaign.imageUrl));
        // }

        await campaign.update({
            ...req.body,
            slug: slugify(req.body.title || campaign.title, { lower: true, strict: true }),
            imageUrl: req.file ? `http://localhost:5000/uploads/campaigns/${req.file.filename}` : campaign.imageUrl
        });

        res.json(campaign);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

exports.deleteCampaign = async (req, res) => {
   try {
        const campaign = await Campaign.findByPk(req.params.id);
        if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

        await campaign.destroy();
        res.json({ message: 'Campaign deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
