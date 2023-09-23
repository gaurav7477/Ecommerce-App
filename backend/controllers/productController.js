import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// create product -- Admin
export const createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })

}


// get all products 

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// get single product details

export const getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 500));
    }
    res.status(200).json({
        success: true,
        product
    })
};

// update product -- Admin
export const updateProduct = async (req, res, next) => {
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
};

// delete product -- Admin
export const deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 500));
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
};

