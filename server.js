// Load environment variables from .env file
require("dotenv").config();
const sequelize = require('./config/db');
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const menuRoutes = require('./routes/menuroutes');
const blogRoutes = require('./routes/blogRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const teamRoutes = require('./routes/teamRoutes');
const donationRoutes = require('./routes/donationRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const contentRoutes = require('./routes/contentRoutes');
const pageRoutes = require('./routes/pageRoutes');
const submenuRoutes = require('./routes/submenuroutes');
const authRoutes = require('./routes/auth');
const sliderRoutes = require('./routes/sliderRoutes');
const homeContentRoutes = require("./routes/homeContentRoutes");
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/auth', authRoutes);
app.use('/api/slider', sliderRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/submenus', submenuRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/campaign', campaignRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/mediaRoutes', mediaRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/contentRoutes', contentRoutes);
app.use('/api/pages', pageRoutes);
app.use("/api/home-content", homeContentRoutes);



sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
});
