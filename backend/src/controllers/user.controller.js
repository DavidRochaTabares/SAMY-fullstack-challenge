const userService = require('../services/user.service');

class UserController {
  async getReqresUsers(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const result = await userService.getReqresUsers(page);
    res.status(result.code || 200).json(result);
  }

  async getReqresUserById(req, res, next) {
    const { id } = req.params;
    const result = await userService.getReqresUserById(parseInt(id));
    res.status(result.code || 200).json(result);
  }

  async importUser(req, res, next) {
    const { id } = req.params;
    const result = await userService.importUserFromReqres(parseInt(id));
    res.status(result.code || 200).json(result);
  }

  async getSavedUsers(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await userService.getSavedUsers(page, limit);
    res.status(result.code || 200).json(result);
  }

  async deleteUser(req, res, next) {
    const { id } = req.params;
    const result = await userService.deleteUser(parseInt(id));
    res.status(result.code || 200).json(result);
  }
}

module.exports = new UserController();
