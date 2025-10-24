const authService = require('../services/auth.service');
const { success, error } = require('../utils/response');

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    return success(res, 201, 'User registered successfully', user);
  } catch (err) {
    return error(res, 400, err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    return success(res, 200, 'Login successful', data);
  } catch (err) {
    return error(res, 401, err.message);
  }
};

module.exports = { register, login };