import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ApiFeatures from "../utils/apiFeatures.js";




// create product -- Admin
export const createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});


// get all products 
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resPerPage);
    const products = await apiFeatures.query;


    res.status(200).json({
        success: true,
        products,
        productCount,
    })
});

// get single product details

export const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 500));
    }
    res.status(200).json({
        success: true,
        product
    })
});

// update product -- Admin
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 500));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
});

// delete product -- Admin
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 500));
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
});

