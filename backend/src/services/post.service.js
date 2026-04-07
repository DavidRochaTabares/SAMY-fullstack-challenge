const postRepository = require('../repositories/post.repository');
const reqresRepository = require('../repositories/reqres.repository');

class PostService {
  async createPost(postData) {
    if (!postData.title || !postData.content || !postData.authorUserId) {
      return {
        success: false,
        message: 'Title, content, and authorUserId are required',
        code: 400
      };
    }

    if (postData.title.length < 3 || postData.title.length > 255) {
      return {
        success: false,
        message: 'Title must be between 3 and 255 characters',
        code: 400
      };
    }

    if (postData.content.length < 10 || postData.content.length > 10000) {
      return {
        success: false,
        message: 'Content must be between 10 and 10000 characters',
        code: 400
      };
    }

    try {
      const post = await postRepository.create(postData);
      return {
        success: true,
        post,
        code: 201
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create post',
        code: 500
      };
    }
  }

  async getPosts(page = 1, limit = 10) {
    if (page < 1 || limit < 1) {
      return {
        success: false,
        message: 'Page and limit must be greater than 0',
        code: 400
      };
    }

    try {
      const result = await postRepository.findAll({ page, limit });
      
      // Para cada post sin autor, consultar desde ReqRes
      const postsWithAuthors = await Promise.all(
        result.posts.map(async (post) => {
          // Crear copia del post para poder modificarlo
          const postCopy = { ...post };
          
          // Si author.id es null, el usuario no está en DB local
          if (postCopy.author && !postCopy.author.id && postCopy.authorUserId) {
            try {
              const reqresUser = await reqresRepository.getUserById(postCopy.authorUserId);
              console.log('ReqRes User:', reqresUser); // DEBUG
              if (reqresUser) {
                postCopy.author = {
                  id: reqresUser.id,
                  firstName: reqresUser.first_name,
                  lastName: reqresUser.last_name,
                  email: reqresUser.email,
                  avatar: reqresUser.avatar
                };
                console.log('Post author set:', postCopy.author); // DEBUG
              }
            } catch (error) {
              console.log('Error fetching user from ReqRes:', error.message); // DEBUG
            }
          }
          return postCopy;
        })
      );
      
      return {
        success: true,
        posts: postsWithAuthors,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
        code: 200
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch posts',
        code: 500
      };
    }
  }

  async getPostById(id) {
    if (!id || id < 1) {
      return {
        success: false,
        message: 'Valid post ID is required',
        code: 400
      };
    }

    try {
      const post = await postRepository.findById(id);
      
      if (!post) {
        return {
          success: false,
          message: 'Post not found',
          code: 404
        };
      }

      const postCopy = { ...post };
      
      if (postCopy.author && !postCopy.author.id && postCopy.authorUserId) {
        try {
          const reqresUser = await reqresRepository.getUserById(postCopy.authorUserId);
          if (reqresUser) {
            postCopy.author = {
              id: reqresUser.id,
              firstName: reqresUser.first_name,
              lastName: reqresUser.last_name,
              email: reqresUser.email,
              avatar: reqresUser.avatar
            };
          }
        } catch (error) {
        }
      }

      return {
        success: true,
        post: postCopy,
        code: 200
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch post',
        code: 500
      };
    }
  }

  async updatePost(id, postData) {
    if (!id || id < 1) {
      return {
        success: false,
        message: 'Valid post ID is required',
        code: 400
      };
    }

    if (postData.title && (postData.title.length < 3 || postData.title.length > 255)) {
      return {
        success: false,
        message: 'Title must be between 3 and 255 characters',
        code: 400
      };
    }

    if (postData.content && (postData.content.length < 10 || postData.content.length > 10000)) {
      return {
        success: false,
        message: 'Content must be between 10 and 10000 characters',
        code: 400
      };
    }

    try {
      const post = await postRepository.update(id, postData);
      
      if (!post) {
        return {
          success: false,
          message: 'Post not found',
          code: 404
        };
      }

      return {
        success: true,
        post,
        code: 200
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update post',
        code: 500
      };
    }
  }

  async deletePost(id) {
    if (!id || id < 1) {
      return {
        success: false,
        message: 'Valid post ID is required',
        code: 400
      };
    }

    try {
      const deleted = await postRepository.delete(id);
      
      if (!deleted) {
        return {
          success: false,
          message: 'Post not found',
          code: 404
        };
      }

      return {
        success: true,
        message: 'Post deleted successfully',
        code: 200
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete post',
        code: 500
      };
    }
  }

  async getPostsByAuthor(authorUserId, page = 1, limit = 10) {
    if (!authorUserId || authorUserId < 1) {
      return {
        success: false,
        message: 'Valid author user ID is required',
        code: 400
      };
    }

    if (page < 1 || limit < 1) {
      return {
        success: false,
        message: 'Page and limit must be greater than 0',
        code: 400
      };
    }

    try {
      const result = await postRepository.findByAuthor(authorUserId, { page, limit });
      return {
        success: true,
        posts: result.posts,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
        code: 200
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch posts by author',
        code: 500
      };
    }
  }
}

module.exports = new PostService();
