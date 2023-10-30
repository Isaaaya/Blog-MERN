const express = require('express');
const router = express.Router();
const { createArticle, getArticleById, updateArticle, deleteArticle, getArticles } = require('../controllers/articleController');
const { protect } = require('../middleware/authMiddleware');
const validateArticle = require('../middleware/validators/validateArticle');

router.route('/').get(getArticles);
router.route('/create').post(protect, validateArticle, createArticle);
router.route('/:articleId').get(getArticleById).put(protect, validateArticle, updateArticle).delete(protect, deleteArticle);

module.exports = router;