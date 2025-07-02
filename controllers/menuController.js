const Menu = require('../models/Menu');
const Submenu = require('../models/Submenu');
const { Op } = require('sequelize');
// Create Menu
exports.createMenu = async (req, res) => {
  try {
    const menu = await Menu.create({ title: req.body.title,slug:req.body.slug

      , createdBy: req.user.id
     });
    res.status(201).json(menu);
  } catch (err) {
    res.status(500).json({ error: 'Menu creation failed', details: err.message });
  }
};


exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id, {
      include: 'Submenus'
    });
    
    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }
    
    res.status(200).json(menu);
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to fetch menu',
      details: err.message 
    });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    // First delete all submenus associated with this menu
    await Submenu.destroy({
      where: { menuId: req.params.id }
    });

    // Then delete the menu itself
    const deleted = await Menu.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    res.status(200).json({ message: 'Menu and its submenus deleted successfully' });
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to delete menu',
      details: err.message 
    });
  }
};
// Get All Menus with Submenus
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll({
      include: Submenu,
      order: [
        ['createdAt', 'ASC'],
        [Submenu, 'createdAt', 'ASC']
      ]
    });
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: 'Fetching failed', details: err.message });
  }
};
// Update only the menu title
exports.updateMenuTitle = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    
    const { title,slug } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Title is required'
      });
    }

    const menu = await Menu.findByPk(id);
    
    if (!menu) {
      return res.status(404).json({
        success: false,
        error: 'Menu not found'
      });
    }

    // Check if new title already exists (excluding current menu)
    const existingMenu = await Menu.findOne({
      where: {
        title,
        slug,
        id: { [Op.not]: id }
      }
    });

    if (existingMenu) {
      return res.status(400).json({
        success: false,
        error: 'Menu with this title already exists'
      });
    }

    menu.title = title;
    menu.slug = slug;
    await menu.save();

    res.json({
      success: true,
      data: {
        id: menu.id,
        title: menu.title
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to update menu title',
      details: err.message
    });
  }
};