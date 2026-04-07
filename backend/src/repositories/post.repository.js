const Post = require('../models/Post');
const User = require('../models/User');

Post.belongsTo(User, {
  foreignKey: 'authorUserId',
  as: 'author'
});

class PostRepository {
  async create(postData) {
    return await Post.create(postData);
  }

  async findAll({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    
    const count = await Post.count();
    
    const posts = await Post.findAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'firstName', 'lastName', 'email', 'avatar']
      }],
      raw: true,
      nest: true
    });

    return {
      posts,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    };
  }

  async findById(id) {
    const post = await Post.findOne({
      where: { id },
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'firstName', 'lastName', 'email', 'avatar']
      }],
      raw: true,
      nest: true
    });
    
    return post;
  }

  async update(id, postData) {
    const post = await Post.findByPk(id);
    if (!post) return null;
    
    await post.update(postData);
    return post;
  }

  async delete(id) {
    const post = await Post.findByPk(id);
    if (!post) return false;
    
    await post.destroy();
    return true;
  }

  async findByAuthor(authorUserId, { page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    
    const { count, rows } = await Post.findAndCountAll({
      where: { authorUserId },
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return {
      posts: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    };
  }
}

module.exports = new PostRepository();
