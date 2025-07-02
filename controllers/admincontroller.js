const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'user_type', 'created_at']
    });
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const makeAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    user.user_type = 'admin';
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    await user.destroy();
    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { getAllUsers, makeAdmin, deleteUser };