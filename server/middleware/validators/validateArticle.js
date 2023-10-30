const { check, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

module.exports = validateArticle = [
    check('title')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage('Title is provided')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Title length must be at least 3 characters')
        .bail()
        .isLength({ max: 80 })
        .withMessage('Title must not contain over 80 letters'),
    check('description')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage('Description is not provided')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Description length must be at least 3 characters')
        .bail()
        .isLength({ max: 120 })
        .withMessage('Description must not contain over 80 letters'),
    check('content')
        .custom((value) => value.replace(/<[^>]+>/g, '').trim() !== '')
        .withMessage('Content is not provided'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() })
        };
        next();
    }
]