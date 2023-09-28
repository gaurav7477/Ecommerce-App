import ErrorHandler from "../utils/ErrorHandler.js";

const errorMiddleWare = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // wrong mongodb id error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;

        err = new ErrorHandler(message, 400);
    }

    // wrong jwt error
    if (err.name == "TokenExpiredError") {
        const message = `Token Expired. Please login again`;
        err = new ErrorHandler(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        // this will show all paths of error in stack
        // err: err.stack,
        message: err.message
    })
};



export default errorMiddleWare;
