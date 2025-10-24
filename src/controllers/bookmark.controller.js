const bookmarkService = require('../services/bookmark.service');
const { success, error } = require('../utils/response');

const toggleBookmark = async (req, res) => {
  try {
    const { articleId } = req.params;
    const result = await bookmarkService.toggleBookmark(req.user.id, articleId);
    return success(res, 200, result.message);
  } catch (err) {
    return error(res, 400, err.message);
  }
};

const getMyBookmarks = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const bookmarks = await bookmarkService.getMyBookmarks(req.user.id, limit, offset);
    return success(res, 200, 'Bookmarks fetched', bookmarks);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

module.exports = { toggleBookmark, getMyBookmarks };