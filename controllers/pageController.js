const  Page  = require('../models/Page');
const  Menu  = require('../models/Menu');
const User = require('../models/User');

// Create page for a menu
exports.createPage = async (req, res) => {
 try {
    const { title, content, seo, status, menuId } = req.body;

    let imageData = null;
    if (req.files['image']) {
      imageData = {
        url: `http://localhost:5000/uploads/pageimage/${req.files['image'][0].filename}`,
      };
    }

    let bannerImageData = null;
    if (req.files['bannerImage']) {
      bannerImageData = {
        url: `http://localhost:5000/uploads/pageimage/${req.files['bannerImage'][0].filename}`,
      };
    }

    const newPage = await Page.create({
      title,
      content,
      seo: JSON.parse(seo),
      status,
      menuId,
      contentImage: imageData,
      bannerImage: bannerImageData,
      createdBy: req.user.id
    });

    res.json({ success: true, data: { page: newPage } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAllPages = async (req, res) => {
  try {
    const pages = await Page.findAll({
      include: [
        { model: User, attributes: ['id', 'username', 'email'] },
        { model: Menu, attributes: ['id', 'title'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: pages
    });

  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const pageId = req.params.id;
    const { title, content, seo, status, menuId } = req.body;

    const page = await Page.findByPk(pageId);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found"
      });
    }

    // Process image if uploaded
    let imageData = page.content.image || null;
    if (req.file) {
      imageData = {
        url: `http://localhost:5000/uploads/pageimage/${req.file.filename}`,
        altText: req.body.imageAltText || ""
      };
    }

    await page.update({
      title: title || page.title,
      // slug: title ? title.toLowerCase().replace(/\s+/g, '-') : page.slug,
      content: {
        text: content || page.content.text,
        image: imageData
      },
      seo: seo ? JSON.parse(seo) : page.seo,
      status: status || page.status,
      menuId: menuId || page.menuId
    });

    res.status(200).json({
      success: true,
      message: "Page updated successfully",
      data: page
    });

  } catch (error) {
    console.error("Error updating page:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// Get all pages for a menu
exports.getPagesByMenu = async (req, res) => {
  try {
    const pages = await Page.findAll({
      where: { menuId: req.params.menuId },
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Menu, attributes: ['id', 'title', 'slug'] }
      ],
      order: [['title', 'ASC']]
    });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deletePage = async (req, res) => {
  try {
    const { id } = req.params;

    // First check if page exists
    const page = await Page.findByPk(id);
    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found"
      });
    }

    // Soft delete (if paranoid is true in model)
    await page.destroy();

    // If you want hard delete instead, use:
    // await page.destroy({ force: true });

    res.status(200).json({
      success: true,
      message: "Page deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting page:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Other CRUD operations (update, delete, get single page)...