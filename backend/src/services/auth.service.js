const reqresRepository = require('../repositories/reqres.repository');

class AuthService {
  async requestMagicCode(email) {
    if (!email) {
      return {
        success: false,
        message: 'Email is required',
        code: 400
      };
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Invalid email format',
        code: 400
      };
    }

    try {
      const response = await reqresRepository.requestMagicCode(email);
      
      // Verificar que el código fue enviado
      if (response.data && response.data.sent === true) {
        return {
          success: true,
          message: 'Magic code sent to your email',
          expiresInMinutes: response.data.expires_in_minutes,
          code: 200
        };
      }
      
      return {
        success: false,
        message: 'Failed to send magic code',
        code: 500
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to request magic code',
        code: 500
      };
    }
  }

  async verifyMagicCode(token) {
    if (!token) {
      return {
        success: false,
        message: 'Verification code is required',
        code: 400
      };
    }

    try {
      const response = await reqresRepository.verifyMagicCode(token);
      
      if (response.data && response.data.session_token) {
        return {
          success: true,
          sessionToken: response.data.session_token,
          email: response.data.email,
          expiresAt: response.data.expires_at,
          projectId: response.data.project_id,
          code: 200
        };
      }
      
      return {
        success: false,
        message: 'Invalid verification code',
        code: 401
      };
    } catch (error) {
      return {
        success: false,
        message: 'Invalid or expired verification code',
        code: 401
      };
    }
  }
}

module.exports = new AuthService();
