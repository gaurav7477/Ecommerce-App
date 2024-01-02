import User from "../models/userModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Product } from "../models/productModel.js";
// add items in cart

export const addItemToCart = catchAsyncErrors(async (req, res, next) => {
  const { productId, quantity } = req.body;
  // console.log("adding ", productId, quantity, "to cart")
  let newCart;
  const itemToAdd = {
    product: productId,
    quantity,
  };
  const user = await User.findById(req.user.id);
  const cartItemPresent = user.cartItems.find(
    (r) => r.product == itemToAdd.product
  );

  if (cartItemPresent) {
    newCart = user.cartItems?.map((i) => {
      if (i.product == cartItemPresent.product) {
        return {
          product: itemToAdd.product,
          quantity: itemToAdd.quantity + i.quantity,
        };
      } else return i;
    });
  } else {
    newCart = [...user.cartItems, itemToAdd];
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { cartItems: newCart },
    {
      new: true,
      runValidators: true,
    }
  ).populate({
    path: "cartItems.product",
    model: Product,
    select: "name price image Stock images",
  });

  const modifiedCart = updatedUser.cartItems.map((cartItem) => {
    const modifiedProduct = { ...cartItem.product._doc };
    modifiedProduct.images = [modifiedProduct.images[0]];
    // console.log(modifiedProduct);
    return {
      product: {
        Stock: modifiedProduct.Stock,
        _id: modifiedProduct._id,
        name: modifiedProduct.name,
        price: modifiedProduct.price,
        image: modifiedProduct.images[0]?.url,
      },
      quantity: cartItem.quantity,
    };
  });

  res.status(200).json({
    success: true,
    items: modifiedCart,
  });
});

export const deleteItemToCart = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.body;
  console.log("deleting ", productId, " from cart");
  const user = await User.findById(req.user.id);

  const newCart = user.cartItems?.filter((i) => {
    return i.product != productId;
  });

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { cartItems: newCart },
    {
      new: true,
      runValidators: true,
    }
  ).populate({
    path: "cartItems.product",
    model: Product,
    select: "name price image Stock images",
  });

  const modifiedCart = updatedUser.cartItems.map((cartItem) => {
    const modifiedProduct = { ...cartItem.product._doc };
    modifiedProduct.images = [modifiedProduct.images[0]];
    // console.log(modifiedProduct);
    return {
      product: {
        Stock: modifiedProduct.Stock,
        _id: modifiedProduct._id,
        name: modifiedProduct.name,
        price: modifiedProduct.price,
        image: modifiedProduct.images[0]?.url,
      },
      quantity: cartItem.quantity,
    };
  });
  // console.log(modifiedCart);
  res.status(200).json({
    success: true,
    items: modifiedCart,
  });
});
