const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const Comment = require('../models/Comment');
const Article = require('../models/Article');

const createComment = asyncHandler(async (req, res) => {
    const { articleId } = req.params;
    const { _id } = req.user;
    const { commentContent } = req.body;
    console.log(req.body)
    const comment = await Comment.create({ author: _id, commentContent });
    await Article.findByIdAndUpdate(articleId, {
        $push: {
            comments: comment
        }
    })
    res.status(StatusCodes.CREATED).json(comment);
});


const deleteComment = asyncHandler(async (req, res) => {
    const { articleId, commentId } = req.params;
    const deleted = await Comment.findByIdAndDelete(commentId);
    await Article.findByIdAndUpdate(articleId, {
        $pull: {
            comments: commentId,
        }
    })
    res.status(StatusCodes.OK).json(deleted)
})

module.exports = { createComment, deleteComment }