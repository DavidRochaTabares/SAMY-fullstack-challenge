const reqresClient = require('../utils/reqresClient');

class ReqresRepository {
  async getUsers(page = 1) {
    try {
      const response = await reqresClient.get(`/users?page=${page}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users from ReqRes: ${error.message}`);
    }
  }

  async getUserById(id) {
    try {
      const response = await reqresClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user ${id} from ReqRes: ${error.message}`);
    }
  }

  async requestMagicCode(email) {
    try {
      const response = await reqresClient.post('/app-users/login', { email });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to request magic code: ${error.message}`);
    }
  }

  async verifyMagicCode(token) {
    try {
      const response = await reqresClient.post('/app-users/verify', { token });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to verify magic code: ${error.message}`);
    }
  }
}

module.exports = new ReqresRepository();
