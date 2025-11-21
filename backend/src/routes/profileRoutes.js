const express = require('express');
const router = express.Router();
const { getPublicProfile, getPrivateProfile } = require('../controllers/profileController');
const auth = require('../middleware/authMiddleware');

router.get('/public/:id', getPublicProfile);
router.get('/private', auth, getPrivateProfile);

module.exports = router;