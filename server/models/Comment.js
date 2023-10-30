const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    commentContent: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    replies: [{ type: mongoose.Types.ObjectId, ref: 'Reply' }]
}, { timestamps: true });


module.exports = mongoose.model('Comment', CommentSchema);