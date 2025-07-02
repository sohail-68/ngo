const { logger } = require('sequelize/lib/utils/logger');
const Blog = require('../models/blog');
const User = require('../models/User');
const slugify = require('slugify');
// Create Blog
exports.createBlog = async (req, res) => {
    try {
        const { title, content, excerpt, status, metaTitle, metaDescription, metaKeywords,publishDate } = req.body;
        if (!title || !content) return res.status(400).json({ message: 'Title and Content required' });
console.log(publishDate);

        const slug = slugify(title, { lower: true, strict: true });

        let imageUrl = '';
        if (req.file) {
            imageUrl = `http://localhost:5000/uploads/blog/${req.file.filename}`;
        }

        const blog = await Blog.create({
            title,
            slug,
            content,
            excerpt,
            image: imageUrl,
            status: status || 'draft',
            metaTitle,
            metaDescription,
            metaKeywords,
            publishedAt:status === 'published' ? publishDate : null, 
            createdBy: req.user.id
        });

        res.json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Get All Blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: [{ model: User, as: 'creator', attributes: ['id', 'username', 'email'] }],
            order: [['createdAt', 'DESC']]
        });

        res.json(blogs);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Single Blog
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id, {
            include: [{ model: User, as: 'creator', attributes: ['id', 'username', 'email'] }]
        });

        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        res.json(blog);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, excerpt, status, metaTitle, metaDescription, metaKeywords } = req.body;
        console.log(req.body);
        console.log(id);
        
        const blog = await Blog.findByPk(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Slug Update Only If Title Changed
        let slug = blog.slug;
        if (title && title !== blog.title) {
            slug = slugify(title, { lower: true, strict: true });
        }

        // Image Update If New Image Provided
        let imageUrl = blog.image;
        if (req.file) {
            imageUrl = `http://localhost:5000/uploads/blog/${req.file.filename}`;
        }

        // Blog Update
        await blog.update({
            title: title || blog.title,
            slug,
            content: content || blog.content,
            excerpt: excerpt || blog.excerpt,
            image: imageUrl,
            status: status || blog.status,
            metaTitle: metaTitle || blog.metaTitle,
            metaDescription: metaDescription || blog.metaDescription,
            metaKeywords: metaKeywords || blog.metaKeywords
        });

        res.json({ success: true, message: "Blog updated successfully", data: blog });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


// Delete Blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);

        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        await blog.destroy();

        res.json({ message: 'Blog deleted successfully' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
