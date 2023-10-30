const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const Article = require('../models/Article');

const createArticle = asyncHandler(async (req, res) => {
    const author = req.user._id;
    const { title, description, content, tags, imageUrl } = req.body;
    if (!tags.length) tags.push('All');
    const article = await Article.create({ author, title, description, content, tags, imageUrl });
    res.status(StatusCodes.CREATED).json(article);
})


const getArticleById = asyncHandler(async (req, res) => {
    const { articleId } = req.params;
    const article = await Article.findById(articleId)
        .populate({ path: 'comments', populate: { path: 'author', select: 'name email imageUrl' } })
        .populate({ path: 'comments', populate: { path: 'replies', populate: { path: 'author', select: 'name email imageUrl' } } })
        .populate('author', 'name createdAt imageUrl').lean();
    res.status(StatusCodes.OK).json(article);
});


const getUserArticles = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const userArticles = await Article.find({ author: _id }).populate('author', 'name createdAt imageUrl').lean();
    res.status(StatusCodes.OK).json(userArticles);
});


const getArticles = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) - 1 || 0;
    const itemsPerPage = 12;
    const search = req.query.search || '';
    let searchedTags = req.query.tag || 'All';
    const availableTags = [
        "fashion",
        "education",
        "science",
        "IT",
        "web",
        "travel",
        "health",
        "politics",
        "economy",
        "self-development",
        "beauty",
        "sport",
        'All',
    ];

    searchedTags === 'All' ? (searchedTags = [...availableTags]) : (searchedTags = req.query.tag.split(','));

    const total = await Article.countDocuments({
        tags: { $in: [...searchedTags] },
        title: { $regex: search, $options: 'i' }
    });

    const pageCount = Math.ceil(total / itemsPerPage);

    const articles = await Article.find({ title: { $regex: search, $options: 'i' } }).where('tags').in([...searchedTags]).skip(page * itemsPerPage).limit(itemsPerPage).populate('author', 'name imageUrl').lean();


    res.status(StatusCodes.OK).json({ articles, total, page: page + 1, pageCount, itemsPerPage });
});

const updateArticle = asyncHandler(async (req, res) => {
    const { articleId } = req.params;
    const { title, description, content, imageUrl } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(articleId, {
        $set: {
            title, description, content, imageUrl
        }
    })
    res.status(StatusCodes.OK).json(updatedArticle);
})

const deleteArticle = asyncHandler(async (req, res) => {
    const { articleId } = req.params;
    const deleted = await Article.findByIdAndRemove(articleId);
    res.status(StatusCodes.OK).json(deleted);
})


module.exports = { createArticle, getArticleById, getUserArticles, updateArticle, deleteArticle, getArticles }