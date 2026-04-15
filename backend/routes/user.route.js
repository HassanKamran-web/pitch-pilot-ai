const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
 