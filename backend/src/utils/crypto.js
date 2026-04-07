const crypto = require('crypto');

class CryptoUtil {
  generateRandomPassword(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  generateRandomToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }
}

module.exports = new CryptoUtil();
