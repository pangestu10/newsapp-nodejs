const express = require('express');
const controller = require('../../controllers/upload.controller');
const { auth } = require('../../middleware/auth.middleware');
const uploadMiddleware = require('../../middleware/upload.middleware');

const router = express.Router();

router.post('/image', auth, uploadMiddleware, controller.uploadImage);

module.exports = router;