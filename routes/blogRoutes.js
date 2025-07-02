const express = require('express');

const router = express.Router();

const blogController = require('../controllers/blogController');
const {authenticate,authorizeRole} = require('../middlewares/auth');

const upload = require('../middlewares/upload');

router.post('/', authenticate,upload.single('image'), authorizeRole(["admin"]), blogController.createBlog);

router.get('/', authenticate,  blogController.getAllBlogs);

router.get('/:id', authenticate, blogController.getBlogById);

router.put('/:id', authenticate,  upload.single('image'), blogController.updateBlog);

router.delete('/:id', authenticate,authorizeRole(["admin"]), blogController.deleteBlog);

module.exports = router;
