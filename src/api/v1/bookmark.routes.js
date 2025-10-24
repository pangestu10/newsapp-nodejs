const express = require('express');
const controller = require('../../controllers/bookmark.controller');
const { auth } = require('../../middleware/auth.middleware');

const router = express.Router();

router.post('/toggle/:articleId', auth, controller.toggleBookmark);
router.get('/my', auth, controller.getMyBookmarks);

module.exports = router;