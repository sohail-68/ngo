const HomeContent = require("../models/Home");

// Get Home Content
exports.getHomeContent = async (req, res) => {
  try {
    const content = await HomeContent.findOne();
    res.json({ success: true, data: content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create Home Content (Run Once)
exports.createHomeContent = async (req, res) => {
  try {
    const { section1, section2, footerMenus } = req.body;

    // Section1 Image Process
    let section1Data = section1 ? JSON.parse(section1) : {};
    if (req.files?.section1Image?.[0]) {
      section1Data.image = `http://localhost:5000/uploads/homepage/${req.files.section1Image[0].filename}`;
    }

    // Section2 Image Process
    let section2Data = section2 ? JSON.parse(section2) : {};
    if (req.files?.section2Image?.[0]) {
      section2Data.image = `http://localhost:5000/uploads/homee/${req.files.section2Image[0].filename}`;
    }

    const newContent = await HomeContent.create({
      section1: section1Data,
      section2: section2Data,
      footerMenus: footerMenus ? JSON.parse(footerMenus) : [],
    });

    res.status(201).json({ success: true, data: newContent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create" });
  }
};

// Update Home Content
exports.updateHomeContent = async (req, res) => {
  try {
    const content = await HomeContent.findOne();
    if (!content) return res.status(404).json({ success: false, message: "Content not found" });

    const { section1, section2, footerMenus } = req.body;

    if (section1) content.section1 = JSON.parse(section1);
    if (section2) content.section2 = JSON.parse(section2);
    if (footerMenus) content.footerMenus = JSON.parse(footerMenus);

    await content.save();

    res.json({ success: true, data: content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

// Delete Home Content
exports.deleteHomeContent = async (req, res) => {
  try {
    const content = await HomeContent.findOne();
    if (!content) return res.status(404).json({ success: false, message: "Content not found" });

    await content.destroy();
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};
