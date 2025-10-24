const commentRepository = require('../repositories/comment.repository');

class CommentService {
  async addComment(articleId, userId, content) {
    return await commentRepository.create({ articleId, userId, content });
  }

  async getCommentsForArticle(articleId, limit, offset) {
    return await commentRepository.findByArticleId(articleId, { limit, offset });
  }

  async deleteComment(commentId, requestingUser) {
    const comment = await commentRepository.findById(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }

    // Otorisasi: Hanya penulis komentar atau admin yang bisa hapus
    if (comment.userId !== requestingUser.id && requestingUser.role !== 'admin') {
      throw new Error('Unauthorized to delete this comment');
    }

    return await commentRepository.delete(commentId);
  }
}

module.exports = new CommentService();