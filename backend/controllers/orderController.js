import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";


// Create new Order
export const newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });
});


// get single order

export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (!order) {
        return next(new ErrorHandler("order not found with this id,404"));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// get logged in user orders or myorders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    });
});


// get All orders -- Admin
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

// update order status -- Admin
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400));
    }

    if (!order) {
        return next(new ErrorHandler('order not found with this id', 404));
    }
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    });

    order.orderStatus = req.body.status;
    if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now();
    }

    await order.save({ validatorBeforeSave: false });
    res.status(200).json({
        success: true,

    });
});



async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.Stock = product.Stock - quantity;
    await product.save({ validatorBeforeSave: false });
}


// delete order -- Admin
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("order not found with this id", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});

