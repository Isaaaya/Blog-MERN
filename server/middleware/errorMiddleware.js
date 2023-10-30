const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const message = err.message;

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = StatusCodes.NOT_FOUND;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = { errorHandler }