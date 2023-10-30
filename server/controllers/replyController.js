const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const Comment = require('../models/Comment');
const Reply = require('../models/Reply');

const createReply = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { commentId } = req.params;
    const { replyContent } = req.body;
    const reply = await Reply.create({ author: _id, replyContent });
    await Comment.findByIdAndUpdate(commentId, {
        $push: {
            replies: reply
        }
    })
    res.status(StatusCodes.CREATED).json(reply);
});

const deleteReply = asyncHandler(async (req, res) => {
    const { commentId, replyId } = req.params;
    const deleted = await Reply.findByIdAndDelete(replyId);
    await Comment.findByIdAndUpdate(commentId, {
        $pull: {
            replies: replyId
        }
    })
    res.status(StatusCodes.OK).json(deleted);
})

module.exports = { createReply, deleteReply };