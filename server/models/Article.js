const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    description: {
        type: String,
        required: true,
        min: 5,
        max: 70,
    },
    imageUrl: {
        type: String,
    },
    content: {
        type: String,
        required: true,
        min: 5
    },
    tags: {
        type: [String],
    },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }]

}, { timestamps: true });


module.exports = mongoose.model('Article', ArticleSchema);