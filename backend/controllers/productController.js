import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ApiFeatures from "../utils/apiFeatures.js";

// create product -- Admin
export const createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  // console.log(product);
  res.status(201).json({
    success: true,
    product,
  });
});

// get all products
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 6;
  const productCount = await Product.countDocuments();
  // console.log(req.query)
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  // console.log(products);
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);

  products = await apiFeatures.query;
  // console.log(products);

  res.status(200).json({
    success: true,
    products,
    productCount,
    resPerPage,
    filteredProductsCount,
  });
});

// get single product details

export const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 500));
  }
  res.status(200).json({
    success: true,
    product,
  });
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
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
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
    message: "Product deleted successfully",
  });
});

// create new review or upadate review

export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  // console.log(review);

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 500));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review

export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 500));
  }

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  if (numOfReviews === 0) {
    product.ratings = 0;
  } else {
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      reviews.length;
  }

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      numOfReviews,
      ratings: product.ratings,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
