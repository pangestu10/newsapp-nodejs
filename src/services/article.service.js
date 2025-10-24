const articleRepository = require('../repositories/article.repository');

class ArticleService {
  async createArticle(articleData, authorId) {
    // Logika untuk membuat slug dari judul
    const slug = articleData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    return await articleRepository.create({ ...articleData, slug, authorId });
  }

  async getPublicArticles(limit, offset) {
    return await articleRepository.findAll({
      where: { status: 'published' },
      limit,
      offset,
    });
  }

  async getAllArticlesForAdmin(limit, offset) {
    return await articleRepository.findAll({ limit, offset });
  }

  async getArticleByIdentifier(id, slug) {
    if (id) return await articleRepository.findById(id);
    if (slug) return await articleRepository.findBySlug(slug);
    return null;
  }

  async updateArticle(id, articleData, requestingUser) {
    const article = await articleRepository.findById(id);
    if (!article) {
      throw new Error('Article not found');
    }

    // Otorisasi: Hanya author atau admin yang bisa update
    if (article.authorId !== requestingUser.id && requestingUser.role !== 'admin') {
      throw new Error('Unauthorized to update this article');
    }

    await articleRepository.update(id, articleData);
    return await articleRepository.findById(id); // Kembalikan data yang sudah diupdate
  }

  async deleteArticle(id, requestingUser) {
    const article = await articleRepository.findById(id);
    if (!article) {
      throw new Error('Article not found');
    }

    // Otorisasi: Hanya author atau admin yang bisa hapus
    if (article.authorId !== requestingUser.id && requestingUser.role !== 'admin') {
      throw new Error('Unauthorized to delete this article');
    }

    return await articleRepository.delete(id);
  }

  async searchArticles(query, limit, offset) {
    if (!query) {
      throw new Error('Search query is required');
    }
    return await articleRepository.search(query, limit, offset);
  }
}


module.exports = new ArticleService();