const userRepository = require('../repositories/user.repository');
const reqresRepository = require('../repositories/reqres.repository');

class UserService {
  async getReqresUsers(page = 1) {
    if (page < 1) {
      return {
        success: false,
        message: 'Page must be greater than 0',
        code: 400
      };
    }

    try {
      const data = await reqresRepository.getUsers(page);
      
      return {
        success: true,
        data: data.data,
        page: data.page,
        perPage: data.per_page,
        total: data.total,
        totalPages: data.total_pages,
        code: 200
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch users from ReqRes',
        code: 500
      };
    }
  }

  async getReqresUserById(id) {
    if (!id || id < 1) {
      return {
        success: false,
        message: 'Valid user ID is required',
        code: 400
      };
    }

    try {
      const data = await reqresRepository.getUserById(id);
      return {
        success: true,
        data: data.data,
        code: 200
      };
    } catch (error) {
      return {
        success: false,
        message: error.message.includes('404') ? 'User not found' : 'Failed to fetch user from ReqRes',
        code: error.message.includes('404') ? 404 : 500
      };
    }
  }

  async importUserFromReqres(reqresUserId) {
    if (!reqresUserId || reqresUserId < 1) {
      return {
        success: false,
        message: 'Valid ReqRes user ID is required',
        code: 400
      };
    }

    const existingUser = await userRepository.findByReqresId(reqresUserId);
    if (existingUser) {
      return {
        success: true,
        message: 'User already saved locally',
        user: existingUser,
        alreadyExists: true,
        code: 200
      };
    }

    try {
      const reqresData = await reqresRepository.getUserById(reqresUserId);
      
      if (!reqresData || !reqresData.data) {
        return {
          success: false,
          message: 'User not found in ReqRes',
          code: 404
        };
      }

      const reqresUser = reqresData.data;

      const existingByEmail = await userRepository.findByEmail(reqresUser.email);
      if (existingByEmail) {
        if (!existingByEmail.reqresId) {
          await userRepository.update(existingByEmail.id, { reqresId: reqresUser.id });
        }
        return {
          success: true,
          message: 'User already exists with this email',
          user: existingByEmail,
          alreadyExists: true,
          code: 200
        };
      }

      const user = await userRepository.create({
        email: reqresUser.email,
        firstName: reqresUser.first_name,
        lastName: reqresUser.last_name,
        avatar: reqresUser.avatar,
        reqresId: reqresUser.id
      });

      return {
        success: true,
        message: 'User imported and saved locally',
        user,
        alreadyExists: false,
        code: 201
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to import user from ReqRes',
        code: 500
      };
    }
  }

  async getSavedUsers(page = 1, limit = 10) {
    if (page < 1 || limit < 1) {
      return {
        success: false,
        message: 'Page and limit must be greater than 0',
        code: 400
      };
    }

    const result = await userRepository.findAll({ page, limit });
    
    return {
      success: true,
      users: result.users,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
      code: 200
    };
  }

  async deleteUser(id) {
    if (!id || id < 1) {
      return {
        success: false,
        message: 'Valid user ID is required',
        code: 400
      };
    }

    const deleted = await userRepository.delete(id);
    
    if (!deleted) {
      return {
        success: false,
        message: 'User not found',
        code: 404
      };
    }

    return {
      success: true,
      message: 'User deleted successfully',
      code: 200
    };
  }
}

module.exports = new UserService();
