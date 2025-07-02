const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const signup = async (req, res) => {
 try {
    const {  username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Input validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Email and password are required' 
      });
    }

    // 2. Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid email or password' 
      });
    }

    // 3. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid email or password' 
      });
    }

    // 4. Generate JWT token (अब role शामिल करें)
    const token = jwt.sign(
      { 
        id: user.id,
        role: user.role  // यहाँ role को token में शामिल करें
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 5. Prepare response data (role को response में शामिल करें)
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,  // यहाँ role को response में शामिल करें
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    // 6. Send success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
// controllers/authController.js
const getProfile = async (req, res) => {
  try {
    // The user ID is attached to the request by your auth middleware
    const userId = req.user.id;
    console.log('Fetching profile for user ID:', userId);

    // Find user in database (using Sequelize in this example)
    const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password'] } // Exclude sensitive fields
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching profile',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { signup, login, getProfile };