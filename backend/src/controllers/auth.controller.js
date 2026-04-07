const authService = require('../services/auth.service');

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
}

module.exports = new AuthController();
