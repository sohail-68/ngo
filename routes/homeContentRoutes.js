const express = require("express");
const router = express.Router();
const upload = require("../middlewares/home");
const controller = require("../controllers/homeContentController");

// Get
router.get("/", controller.getHomeContent);

// Create
router.post("/",  upload.fields([
    { name: "section1Image", maxCount: 1 },
    { name: "section2Image", maxCount: 1 },
  ]),
 controller.createHomeContent);

// Update
router.put("/", controller.updateHomeContent);

// Delete
router.delete("/", controller.deleteHomeContent);

module.exports = router;
