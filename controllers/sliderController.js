const Slider = require('../models/Slider');

// Get All
exports.getAllSliders = async (req, res) => {
    try {
        const sliders = await Slider.findAll();
        res.json(sliders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get By ID
exports.getSliderById = async (req, res) => {
    try {
        const slider = await Slider.findByPk(req.params.id);
        slider ? res.json(slider) : res.status(404).json({ error: 'Slider not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create with Image
exports.createSlider = async (req, res) => {    
    try {
        const { title, description } = req.body;
        const image_url = req.file ? `http://localhost:5000/uploads/sliders/${req.file.filename}` : null;

        if (!image_url) return res.status(400).json({ error: 'Image required' });

        const newSlider = await Slider.create({image_url: image_url, title:title, description,createdBy:req.user.id });
        res.json(newSlider);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update with Optional Image
exports.updateSlider = async (req, res) => {
    try {
        const slider = await Slider.findByPk(req.params.id);
        if (!slider) return res.status(404).json({ error: 'Slider not found' });

        const { title, description } = req.body;
        const image_url = req.file ? `http://localhost:5000/uploads/sliders/${req.file.filename}` : slider.image_url;

        slider.title = title || slider.title;
        slider.description = description || slider.description;
        slider.image_url = image_url;

        await slider.save();
        res.json({ message: 'Updated successfully', slider });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete
exports.deleteSlider = async (req, res) => {
    try {
        const slider = await Slider.findByPk(req.params.id);
        if (!slider) return res.status(404).json({ error: 'Slider not found' });

        await slider.destroy();
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
