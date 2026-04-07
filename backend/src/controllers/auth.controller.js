const authService = require('../services/auth.service');
const reqresClient = require('../utils/reqresClient');

class AuthController {
  async requestMagicCode(req, res, next) {
    const { email } = req.body;
    const result = await authService.requestMagicCode(email);
    res.status(result.code || 200).json(result);
  }

  async verifyMagicCode(req, res, next) {
    const { token } = req.body;
    const result = await authService.verifyMagicCode(token);
    res.status(result.code || 200).json(result);
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    
    try {
      const response = await reqresClient.post('/login', { email, password });
      res.json({
        success: true,
        token: response.data.token,
        message: 'Login successful'
      });
    } catch (error) {
      res.status(error.response?.status || 500).json({
        success: false,
        message: error.response?.data?.error || 'Login failed'
      });
    }
  }
}

module.exports = new AuthController();
