const mongoose = require('mongoose');

const ReplySchema = mongoose.Schema({
    replyContent: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });


module.exports = mongoose.model('Reply', ReplySchema);