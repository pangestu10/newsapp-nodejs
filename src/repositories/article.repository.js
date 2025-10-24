const { Article, Op } = require('../models');

class ArticleRepository {
  async findAll(options = {}) {
    const { limit = 10, offset = 0, where = {}, include } = options;
    return await Article.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      include,
    });
  }

  async findById(id) {
    return await Article.findByPk(id, { include: [{ model: require('../models').User, as: 'author', attributes: ['id', 'name'] }] });
  }

  async findBySlug(slug) {
    return await Article.findOne({ where: { slug }, include: [{ model: require('../models').User, as: 'author', attributes: ['id', 'name'] }] });
  }

  async create(articleData) {
    return await Article.create(articleData);
  }

  async update(id, articleData) {
    return await Article.update(articleData, { where: { id } });
  }

  async delete(id) {
    return await Article.destroy({ where: { id } });
  }

  async search(query, limit, offset) {
    return await Article.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { content: { [Op.like]: `%${query}%` } },
        ],
        status: 'published',
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{ model: require('../models').User, as: 'author', attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']],
    });
  }
}

module.exports = new ArticleRepository();