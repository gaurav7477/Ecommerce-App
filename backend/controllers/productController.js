import { Product } from "../models/productModel.js";


// create product
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

// update product
export const updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
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

// delete product
export const deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product deleted"
    })
};

