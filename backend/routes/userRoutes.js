const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { getUserByEmail } = require('../controllers/userController');

router.get('/', auth, roleCheck('admin'), getUserByEmail);

module.exports = router;
