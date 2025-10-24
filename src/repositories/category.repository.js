const { Category } = require('../models');

class CategoryRepository {
  async findAll() {
    return await Category.findAll({ order: [['name', 'ASC']] });
  }

  async findById(id) {
    return await Category.findByPk(id);
  }

  async create(categoryData) {
    return await Category.create(categoryData);
  }

  async update(id, categoryData) {
    return await Category.update(categoryData, { where: { id } });
  }

  async delete(id) {
    return await Category.destroy({ where: { id } });
  }
}

module.exports = new CategoryRepository();