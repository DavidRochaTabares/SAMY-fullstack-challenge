const User = require('../models/User');
const { Op } = require('sequelize');

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async findById(id) {
    return await User.findByPk(id);
  }

  async findByReqresId(reqresId) {
    return await User.findOne({ where: { reqresId } });
  }

  async create(userData) {
    return await User.create(userData);
  }

  async update(id, userData) {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }
    return await user.update(userData);
  }

  async delete(id) {
    const user = await this.findById(id);
    if (!user) {
      return false;
    }
    await user.destroy();
    return true;
  }

  async findAll(options = {}) {
    const { page = 1, limit = 10, search } = options;
    const offset = (page - 1) * limit;

    const where = search ? {
      [Op.or]: [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ]
    } : {};

    const { count, rows } = await User.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return {
      users: rows,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit)
    };
  }

  async exists(email) {
    const count = await User.count({ where: { email } });
    return count > 0;
  }
}

module.exports = new UserRepository();
