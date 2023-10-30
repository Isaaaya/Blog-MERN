const { check, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const User = require('../../models/User');

module.exports = validateRegisterUser = [
    check('email')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage('Email is required')
        .bail()
        .custom(async (value) => {
            const existingUser = await User.findOne({ email: value });
            if (!existingUser) {
                return Promise.reject('Email is not registered')
            }
        }),
    check('password')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage('Password is required')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
        next();
    }
]