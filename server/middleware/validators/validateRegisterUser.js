const { check, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const User = require('../../models/User');

module.exports = validateRegisterUser = [
    check('name')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage('Name is required')
        .bail()
        .isLength({ min: 2 })
        .withMessage('Name must contain at least 2 letters')
        .bail()
        .isLength({ max: 30 })
        .withMessage('Name must not contain over 30 letters')
        .bail(),
    check('email')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Invalid email')
        .bail()
        .custom(async (value) => {
            const existingUser = await User.findOne({ email: value });
            if (existingUser) {
                return Promise.reject('Email is already registered')
            }
        }),
    check('password')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage('Password is required')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Password must contain at least 3 letters')
        .bail()
        .isLength({ max: 30 })
        .withMessage('Password must not contain over 30 letters')
        .bail(),
    check('confirmPassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords should match')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
        next();
    }
]