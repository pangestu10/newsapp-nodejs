const { Bookmark, Article } = require('../models');

class BookmarkRepository {
  async isBookmarked(userId, articleId) {
    const bookmark = await Bookmark.findOne({ where: { userId, articleId } });
    return !!bookmark;
  }

  async addBookmark(userId, articleId) {
    return await Bookmark.create({ userId, articleId });
  }

  async removeBookmark(userId, articleId) {
    return await Bookmark.destroy({ where: { userId, articleId } });
  }

  async findBookmarkedArticlesByUser(userId, options = {}) {
    const { limit = 10, offset = 0 } = options;
    const { count, rows } = await Article.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: require('../models').User,
          as: 'bookmarkedBy',
          where: { id: userId },
          attributes: [], // Tidak perlu data user di hasil
          through: { attributes: [] }, // Tidak perlu data dari tabel penghubung
        },
        { model: require('../models').User, as: 'author', attributes: ['id', 'name'] },
      ],
    });
    return { count, rows };
  }
}

module.exports = new BookmarkRepository();