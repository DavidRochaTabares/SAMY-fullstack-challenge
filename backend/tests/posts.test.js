const request = require('supertest');
const app = require('../src/server');
const { sequelize } = require('../src/config/database');
const User = require('../src/models/User');
const Post = require('../src/models/Post');

describe('Posts API', () => {
  let testUserId;
  let testPostId;

  beforeAll(async () => {
    // Crear usuario de prueba
    const user = await User.create({
      reqresId: 999,
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      avatar: 'https://test.com/avatar.jpg'
    });
    testUserId = user.id;
  });

  afterAll(async () => {
    // Limpiar datos de prueba
    await Post.destroy({ where: { authorUserId: testUserId } });
    await User.destroy({ where: { id: testUserId } });
    await sequelize.close();
  });

  describe('POST /api/posts', () => {
    it('should create a new post', async () => {
      const response = await request(app)
        .post('/api/posts')
        .send({
          title: 'Test Post Title',
          content: 'This is test post content with enough characters',
          authorUserId: testUserId
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.post).toBeDefined();
      expect(response.body.post.title).toBe('Test Post Title');
      
      testPostId = response.body.post.id;
    });

    it('should fail to create post with short title', async () => {
      const response = await request(app)
        .post('/api/posts')
        .send({
          title: 'AB',
          content: 'This is test post content',
          authorUserId: testUserId
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/posts', () => {
    it('should get all posts', async () => {
      const response = await request(app)
        .get('/api/posts');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.posts).toBeDefined();
      expect(Array.isArray(response.body.posts)).toBe(true);
    });
  });

  describe('PUT /api/posts/:id', () => {
    it('should update a post', async () => {
      const response = await request(app)
        .put(`/api/posts/${testPostId}`)
        .send({
          title: 'Updated Test Title',
          content: 'Updated test post content with enough characters'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.post.title).toBe('Updated Test Title');
    });
  });
});
