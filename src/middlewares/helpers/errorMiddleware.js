module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = `Resource not found. Invalid: ${err.path}`;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        err.statusCode = 400;
        const field = Object.keys(err.keyValue || {})[0] || 'field';
        err.message = `${field} already exists`;
    }

    // Mongoose validation
    if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = Object.values(err.errors || {}).map((e) => e.message).join(', ');
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
