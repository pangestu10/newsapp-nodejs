const { error } = require('../utils/response');

const validate = (schema) => {
  return (req, res, next) => {
    const { error: validationError } = schema.validate(req.body);
    if (validationError) {
      const message = validationError.details[0].message;
      return error(res, 400, message);
    }
    next();
  };
};

module.exports = validate;