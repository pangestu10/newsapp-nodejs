const bookmarkRepository = require('../repositories/bookmark.repository');

class BookmarkService {
  async toggleBookmark(userId, articleId) {
    const isBookmarked = await bookmarkRepository.isBookmarked(userId, articleId);
    if (isBookmarked) {
      await bookmarkRepository.removeBookmark(userId, articleId);
      return { message: 'Bookmark removed' };
    } else {
      await bookmarkRepository.addBookmark(userId, articleId);
      return { message: 'Article bookmarked' };
    }
  }

  async getMyBookmarks(userId, limit, offset) {
    return await bookmarkRepository.findBookmarkedArticlesByUser(userId, { limit, offset });
  }
}

module.exports = new BookmarkService();