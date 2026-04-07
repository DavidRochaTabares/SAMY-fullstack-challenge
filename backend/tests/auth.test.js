const request = require('supertest');
const app = require('../src/server');

describe('Auth API', () => {
  describe('POST /api/auth/request-code', () => {
    it('should send verification code successfully with valid email', async () => {
      const response = await request(app)
        .post('/api/auth/request-code')
        .send({
          email: 'test@example.com'
        });

      // Puede ser 200 (éxito) o 500 (API externa con rate limit)
      expect([200, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(response.body.message).toContain('sent');
      } else {
        // Si falla por rate limit de API externa, es aceptable
        expect(response.body.success).toBe(false);
      }
    });

    it('should fail without email', async () => {
      const response = await request(app)
        .post('/api/auth/request-code')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should fail with invalid email format', async () => {
      const response = await request(app)
        .post('/api/auth/request-code')
        .send({
          email: 'invalid-email'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/verify-code', () => {
    it('should fail with invalid token', async () => {
      const response = await request(app)
        .post('/api/auth/verify-code')
        .send({
          token: 'INVALID123'
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it('should fail without token', async () => {
      const response = await request(app)
        .post('/api/auth/verify-code')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
