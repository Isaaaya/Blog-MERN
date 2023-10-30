const express = require('express');
const router = express.Router();
const { createComment, deleteComment } = require('../controllers/commentController');
const { createReply, deleteReply } = require('../controllers/replyController');
const { protect } = require('../middleware/authMiddleware');
const validateCreateComment = require('../middleware/validators/validateCreateComment');
const validateCreateReply = require('../middleware/validators/validateCreateReply')

router.route('/:articleId/comment').post(protect, validateCreateComment, createComment);
router.route('/:articleId/comment/:commentId').delete(protect, deleteComment).post(protect, validateCreateReply, createReply);
router.route('/:articleId/comment/:commentId/replies/:replyId').delete(protect, deleteReply);

module.exports = router;