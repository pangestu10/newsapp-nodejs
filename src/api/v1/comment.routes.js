const express = require('express');
const controller = require('../../controllers/comment.controller');
const { auth } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validation.middleware');
const Joi = require('joi');

const router = express.Router();

const commentSchema = Joi.object({
  content: Joi.string().min(3).required(),
});

router.get('/article/:articleId', controller.getComments);
router.post('/article/:articleId', auth, validate(commentSchema), controller.addComment);
router.delete('/:id', auth, controller.deleteComment);

module.exports = router;