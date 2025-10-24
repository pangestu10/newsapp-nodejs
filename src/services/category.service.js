const categoryRepository = require('../repositories/category.repository');

class CategoryService {
  async createCategory(categoryData) {
    const slug = categoryData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    return await categoryRepository.create({ ...categoryData, slug });
  }

  async getCategories() {
    return await categoryRepository.findAll();
  }

  async getCategoryById(id) {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async updateCategory(id, categoryData) {
    await this.getCategoryById(id); // Cek apakah ada
    if (categoryData.name) {
      const slug = categoryData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      categoryData.slug = slug;
    }
    await categoryRepository.update(id, categoryData);
    return await categoryRepository.findById(id);
  }

  async deleteCategory(id) {
    await this.getCategoryById(id); // Cek apakah ada
    return await categoryRepository.delete(id);
  }
}

module.exports = new CategoryService();