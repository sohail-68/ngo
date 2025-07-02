const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const {authenticate,authorizeRole} = require('../middlewares/auth');


// ➕ Create Menu
router.post('/',  authenticate,authorizeRole(["admin",]), menuController.createMenu);
router.patch('/:id/title',authenticate,authorizeRole(["admin",]), menuController.updateMenuTitle);
// 📥 Get All Menus with Submenus
router.get('/:id', menuController.getMenuById);
router.delete('/:id', authenticate,authorizeRole(["admin",]), menuController.deleteMenu);
router.get('/', menuController.getAllMenus);

module.exports = router;