const { Comment } = require('../models');

class CommentRepository {
  async findByArticleId(articleId, options = {}) {
    const { limit = 10, offset = 0 } = options;
    return await Comment.findAndCountAll({
      where: { articleId },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      include: [{ model: require('../models').User, as: 'user', attributes: ['id', 'name'] }],
    });
  }

  async create(commentData) {
    return await Comment.create(commentData);
  }

  async findById(id) {
    return await Comment.findByPk(id);
  }

  async delete(id) {
    return await Comment.destroy({ where: { id } });
  }
}

module.exports = new CommentRepository();