const request = require('supertest');
const app = require('../src/server');
const { sequelize } = require('../src/config/database');
const User = require('../src/models/User');

describe('Users API', () => {
  afterAll(async () => {
    await User.destroy({ where: { reqres_id: [1, 2] } });
    await sequelize.close();
  });

  describe('POST /api/users/import/:id', () => {
    it('should import a user from ReqRes', async () => {
      const response = await request(app)
        .post('/api/users/import/1');

      expect([200, 201]).toContain(response.status);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBeDefined();
    });

    it('should fail to import non-existent user', async () => {
      const response = await request(app)
        .post('/api/users/import/99999');

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/users/saved', () => {
    it('should get saved users', async () => {
      const response = await request(app)
        .get('/api/users/saved');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.users).toBeDefined();
      expect(Array.isArray(response.body.users)).toBe(true);
    });
  });
});
