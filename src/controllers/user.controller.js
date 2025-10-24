const userService = require('../services/user.service');
const { success, error } = require('../utils/response');

const getMyProfile = async (req, res) => {
  try {
    // req.user.id didapat dari middleware auth
    const user = await userService.getProfile(req.user.id);
    return success(res, 200, 'Profile fetched successfully', user);
  } catch (err) {
    return error(res, 404, err.message);
  }
};

const updateMyProfile = async (req, res) => {
  try {
    // req.user.id didapat dari middleware auth
    const user = await userService.updateProfile(req.user.id, req.body);
    return success(res, 200, 'Profile updated successfully', user);
  } catch (err) {
    return error(res, 400, err.message);
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
};