const commentService = require('../services/comment.service');
const { success, error } = require('../utils/response');

const addComment = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { content } = req.body;
    const comment = await commentService.addComment(articleId, req.user.id, content);
    return success(res, 201, 'Comment added', comment);
  } catch (err) {
    return error(res, 400, err.message);
  }
};

const getComments = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { limit = 10, offset = 0 } = req.query;
    const comments = await commentService.getCommentsForArticle(articleId, limit, offset);
    return success(res, 200, 'Comments fetched', comments);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await commentService.deleteComment(id, req.user);
    return success(res, 200, 'Comment deleted');
  } catch (err) {
    return error(res, 400, err.message);
  }
};

module.exports = { addComment, getComments, deleteComment };