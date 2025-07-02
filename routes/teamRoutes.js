const router = require('express').Router();
const teamController = require('../controllers/teamController');
const {authenticate} = require('../middlewares/auth');
const upload = require('../middlewares/team');

// Create Team Member
router.post('/', authenticate,upload.single('image'), teamController.createTeamMember);

// Get All Team Members
router.get('/',authenticate, teamController.getAllTeamMembers);

// Get Single Team Member by ID
router.get('/:id', teamController.getTeamMemberById);

// Update Team Member
router.put('/:id', authenticate, upload.single('image'),teamController.updateTeamMember);

// Delete Team Member
router.delete('/:id', authenticate, teamController.deleteTeamMember);

module.exports = router;
