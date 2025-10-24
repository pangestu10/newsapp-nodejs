const express = require('express');
const controller = require('../../controllers/user.controller');
const { auth } = require('../../middleware/auth.middleware');
const router = express.Router();

router.get('/me', auth, controller.getMyProfile);
router.put('/me', auth, controller.updateMyProfile);

module.exports = router;