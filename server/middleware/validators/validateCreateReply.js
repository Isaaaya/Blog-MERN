const { check, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

module.exports = validateCreateReply = [
    check('replyContent')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage('Reply content is required')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() })
        };
        next();
    }
]