const express = require('express');
const articleController = require('../../controllers/article.controller');
const { auth, authorize } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validation.middleware');
const Joi = require('joi');

const router = express.Router();

const articleSchema = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().min(10).required(),
  status: Joi.string().valid('draft', 'published').optional(),
});

// Public routes
router.get('/', articleController.getPublicArticles);
router.get('/search', articleController.searchArticles); // Route pencarian harus sebelum parameter
router.get('/:slug', articleController.getArticleBySlug);

// Protected routes
router.use(auth);

// Routes untuk writer/editor ke atas
router.post('/', authorize('writer', 'editor', 'admin'), validate(articleSchema), articleController.createArticle);
router.get('/admin/all', authorize('admin', 'editor'), articleController.getAllArticlesForAdmin);

// Allow partial updates for PUT by using a relaxed schema
const updateArticleSchema = Joi.object({
  title: Joi.string().min(5).optional(),
  content: Joi.string().min(10).optional(),
  status: Joi.string().valid('draft', 'published').optional(),
}).min(1);

router.put('/:id', authorize('writer', 'editor', 'admin'), validate(updateArticleSchema), articleController.updateArticle);
router.delete('/:id', authorize('writer', 'admin'), articleController.deleteArticle);

module.exports = router;