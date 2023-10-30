const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const { StatusCodes } = require('http-status-codes');

module.exports = validateUpdateUser = [
    check('name')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage('Name is required'),
    check('email')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email is invalid')
        .bail()
        .custom(async (value, { req }) => {
            const existingUser = await User.findOne({ email: value });
            if (existingUser && existingUser?.email !== req.user.email) {
                return new Promise.reject('The email is already taken')
            }
        })
        .withMessage('The email is already taken'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() })
        };
        next();
    }
]