const { error } = require('../utils/response');

const validate = (schema) => {
  return (req, res, next) => {
    const { error: validationError, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (validationError) {
      const messages = validationError.details.map((d) => d.message);
      return error(res, 400, messages.join(', '));
    }
    req.body = value;
    next();
  };
};

module.exports = validate;