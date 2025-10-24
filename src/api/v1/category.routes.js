const express = require('express');
const controller = require('../../controllers/category.controller');
const { auth, authorize } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validation.middleware');
const Joi = require('joi');

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().min(3).required(),
});

router.get('/', controller.getCategories);
router.post('/', auth, authorize('admin', 'editor'), validate(schema), controller.createCategory);

module.exports = router;