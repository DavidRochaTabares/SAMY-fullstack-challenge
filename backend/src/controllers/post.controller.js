const postService = require('../services/post.service');

class PostController {
  async createPost(req, res, next) {
    const { title, content, authorUserId } = req.body;
    const result = await postService.createPost({ title, content, authorUserId });
    res.status(result.code || 200).json(result);
  }

  async getPosts(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await postService.getPosts(page, limit);
    res.status(result.code || 200).json(result);
  }

  async getPostById(req, res, next) {
    const { id } = req.params;
    const result = await postService.getPostById(parseInt(id));
    res.status(result.code || 200).json(result);
  }

  async updatePost(req, res, next) {
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await postService.updatePost(parseInt(id), { title, content });
    res.status(result.code || 200).json(result);
  }

  async deletePost(req, res, next) {
    const { id } = req.params;
    const result = await postService.deletePost(parseInt(id));
    res.status(result.code || 200).json(result);
  }

  async getPostsByAuthor(req, res, next) {
    const { authorId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await postService.getPostsByAuthor(parseInt(authorId), page, limit);
    res.status(result.code || 200).json(result);
  }
}

module.exports = new PostController();
