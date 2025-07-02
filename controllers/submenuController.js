const Submenu = require('../models/Submenu');

// Create Submenu
exports.createSubmenu = async (req, res) => {
  try {
    const submenu = await Submenu.create({
      title: req.body.title,
      slug: req.body.slug,
      menuId: req.body.menuId
    });
    res.status(201).json(submenu);
  } catch (err) {
    res.status(500).json({ 
      error: 'Submenu creation failed',
      details: err.message 
    });
  }
};