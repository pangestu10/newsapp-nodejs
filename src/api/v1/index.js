const express = require('express');
const authRoutes = require('./auth.routes');
const articleRoutes = require('./article.routes');
const categoryRoutes = require('./category.routes');
const uploadRoutes = require('./upload.routes');
const userRoutes = require('./user.routes');
const commentRoutes = require('./comment.routes');
const bookmarkRoutes = require('./bookmark.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/articles', articleRoutes);
router.use('/categories', categoryRoutes);
router.use('/upload', uploadRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/bookmarks', bookmarkRoutes);

module.exports = router;