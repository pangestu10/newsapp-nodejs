const articleService = require('../services/article.service');
const { success, error } = require('../utils/response');

const createArticle = async (req, res) => {
  try {
    const article = await articleService.createArticle(req.body, req.user.id);
    return success(res, 201, 'Article created successfully', article);
  } catch (err) {
    return error(res, 400, err.message);
  }
};

const getPublicArticles = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const articles = await articleService.getPublicArticles(limit, offset);
    return success(res, 200, 'Articles fetched successfully', articles);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

const getAllArticlesForAdmin = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const articles = await articleService.getAllArticlesForAdmin(limit, offset);
    return success(res, 200, 'All articles fetched successfully', articles);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

const getArticleBySlug = async (req, res) => {
  try {
    const article = await articleService.getArticleByIdentifier(null, req.params.slug);
    if (!article || article.status !== 'published') {
      return error(res, 404, 'Article not found');
    }
    return success(res, 200, 'Article fetched successfully', article);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await articleService.updateArticle(req.params.id, req.body, req.user);
    return success(res, 200, 'Article updated successfully', article);
  } catch (err) {
    return error(res, 400, err.message);
  }
};

const deleteArticle = async (req, res) => {
  try {
    await articleService.deleteArticle(req.params.id, req.user);
    return success(res, 200, 'Article deleted successfully');
  } catch (err) {
    return error(res, 400, err.message);
  }
};

// TAMBAHKAN FUNGSI SEARCH INI
const searchArticles = async (req, res) => {
  try {
    const { q, limit = 10, offset = 0 } = req.query;
    const articles = await articleService.searchArticles(q, limit, offset);
    return success(res, 200, 'Search results', articles);
  } catch (err) {
    return error(res, 400, err.message);
  }
};

// PASTIKAN SEMUA FUNGSI DIEKSPOR DI SINI
module.exports = {
  createArticle,
  getPublicArticles,
  getAllArticlesForAdmin,
  getArticleBySlug,
  updateArticle,
  deleteArticle,
  searchArticles, // <-- Jangan lupa ini!
};