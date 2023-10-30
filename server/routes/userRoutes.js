const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { getUserArticles } = require('../controllers/articleController')
const { protect } = require('../middleware/authMiddleware');
const validateUpdateUser = require('../middleware/validators/validateUpdateUser');

router.route('/').get(protect, getAllUsers);
router.route('/:userId').get(protect, getUserById);
router.route('/profile').put(protect, validateUpdateUser, updateUser).delete(protect, deleteUser);
router.route('/profile/articles').get(protect, getUserArticles)

module.exports = router;