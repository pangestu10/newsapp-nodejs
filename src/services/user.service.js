const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcryptjs');

class UserService {
  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateProfile(userId, userData) {
    // Hash password jika ada di request body
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    await userRepository.updateUser(userId, userData);
    return await userRepository.findById(userId); // Kembalikan data yang sudah diupdate
  }
}

module.exports = new UserService();