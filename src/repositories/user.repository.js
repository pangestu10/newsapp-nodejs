const { User } = require('../models');

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async findById(id) {
    return await User.findByPk(id, { attributes: { exclude: ['password'] } });
  }

  async create(userData) {
    return await User.create(userData);
  }

  // Tambahkan method untuk update
  async updateUser(id, userData) {
    // Jangan update password di sini, tangani di service
    const { password, ...dataToUpdate } = userData;
    return await User.update(dataToUpdate, { where: { id } });
  }
}

module.exports = new UserRepository();