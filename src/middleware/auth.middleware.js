const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');
const { error } = require('../utils/response');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return error(res, 401, 'Access denied. No token provided.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return error(res, 401, 'Invalid token.');
    }

    req.user = user;
    next();
  } catch (err) {
    return error(res, 401, 'Invalid token.');
  }
};

// Middleware untuk otorisasi berdasarkan role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return error(res, 403, 'Forbidden: You do not have the required permission.');
    }
    next();
  };
};

module.exports = { auth, authorize };