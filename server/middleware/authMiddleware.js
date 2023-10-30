const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        const { userId } = jwt.verify(token, process.env.SECRET_JWT);
        try {
            const user = await User.findById(userId).select('-password');
            req.user = user;
            res.status(StatusCodes.OK)
            next();
        } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED);
            throw new Error('Not authorized, invalid token');
        }
    } else {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('Not authorized, no token');
    }
})

module.exports = { protect };