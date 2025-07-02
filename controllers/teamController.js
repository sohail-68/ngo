const Team = require('../models/Team');
const User = require('../models/User');

// Create Team Member
exports.createTeamMember = async (req, res) => {
    try {
        const { name, designation, description, facebook, twitter, linkedin } = req.body;
   let imageUrl = '';
        if (req.file) {
            imageUrl = `http://localhost:5000/uploads/team/${req.file.filename}`;
        }
        const teamMember = await Team.create({
            name,
            designation,
            image:imageUrl,
            description,
            facebook,
            twitter,
            linkedin,
            createdBy: req.user.id
        });

        res.status(201).json(teamMember);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Team Members
exports.getAllTeamMembers = async (req, res) => {
    try {
        const team = await Team.findAll({
            include: [{ model: User, as: 'creator', attributes: ['id', 'username', 'email'] }],
            order: [['createdAt', 'DESC']]
        });

        res.json(team);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Single Team Member
exports.getTeamMemberById = async (req, res) => {
    try {
        const teamMember = await Team.findByPk(req.params.id, {
            include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'email'] }]
        });

        if (!teamMember) return res.status(404).json({ message: 'Team member not found' });

        res.json(teamMember);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Team Member
exports.updateTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        
        const { name, designation, description, facebook, twitter, linkedin } = req.body;

        // Existing team member check
        const teamMember = await Team.findByPk(id);
        if (!teamMember) {
            return res.status(404).json({ error: 'Team member not found' });
        }

        // Image update check
        let imageUrl = teamMember.image;
        if (req.file) {
            imageUrl = `http://localhost:5000/uploads/team/${req.file.filename}`;
        }

        // Update fields
        await teamMember.update({
            name: name || teamMember.name,
            designation: designation || teamMember.designation,
            image: imageUrl,
            description: description || teamMember.description,
            facebook: facebook || teamMember.facebook,
            twitter: twitter || teamMember.twitter,
            linkedin: linkedin || teamMember.linkedin,
            updatedBy: req.user.id
        });

        res.status(200).json(teamMember);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


// Delete Team Member
exports.deleteTeamMember = async (req, res) => {
    try {
        const teamMember = await Team.findByPk(req.params.id);

        if (!teamMember) return res.status(404).json({ message: 'Team member not found' });

        await teamMember.destroy();

        res.json({ message: 'Team member deleted successfully' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
