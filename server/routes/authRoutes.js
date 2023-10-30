const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logout } = require('../controllers/authController');
const validateRegisterUser = require('../middleware/validators/validateRegisterUser');
const validateLoginUser = require('../middleware/validators/validateLoginUser')

router.route('/register').post(validateRegisterUser, registerUser);
router.route('/login').post(validateLoginUser, loginUser);
router.route('/logout').post(logout);

module.exports = router;