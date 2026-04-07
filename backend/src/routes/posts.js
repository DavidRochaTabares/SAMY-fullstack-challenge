const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const asyncHandler = require('../middleware/asyncHandler');

// CRUD endpoints
router.post('/', asyncHandler(postController.createPost));
router.get('/', asyncHandler(postController.getPosts));
router.get('/:id', asyncHandler(postController.getPostById));
router.put('/:id', asyncHandler(postController.updatePost));
router.delete('/:id', asyncHandler(postController.deletePost));

// Get posts by author
router.get('/author/:authorId', asyncHandler(postController.getPostsByAuthor));

module.exports = router;
