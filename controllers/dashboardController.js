const User = require('../models/User');
const Blog = require('../models/blog');
const Campaign = require('../models/Campaign');
const Donation = require('../models/Donation');
const Media = require('../models/Media');

exports.getQuickStats = async (req, res) => {
    try {
        const [users, blogs, campaigns, donations, media] = await Promise.all([
            User.count(),
            Blog.count(),
            Campaign.count(),
            Donation.sum('amount'),
            Media.count()
        ]);

        res.json({
            totalUsers: users,
            totalBlogs: blogs,
            totalCampaigns: campaigns,
            totalDonations: donations || 0,
            totalMedia: media
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
