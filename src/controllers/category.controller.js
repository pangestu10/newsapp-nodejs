const categoryService = require('../services/category.service');
const { success, error } = require('../utils/response');

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    return success(res, 201, 'Category created', category);
  } catch (err) {
    return error(res, 400, err.message);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    return success(res, 200, 'Categories fetched', categories);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

// ... (tambahkan fungsi updateCategory, deleteCategory, getCategoryById dengan pola serupa)

module.exports = { createCategory, getCategories };