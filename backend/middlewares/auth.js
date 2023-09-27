import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";

export const isAuthenicatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Login first to access this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);


    req.user = await User.findById(decodedData.id);
    next();
});


// authorization roles
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403))
        }
        next();
    };
};
