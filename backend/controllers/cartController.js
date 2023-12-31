import User from "../models/userModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
// add items in cart

export const addItemToCart = catchAsyncErrors(async (req, res, next) => {
  const { productId, quantity } = req.body;
  let newCart;
  const itemToAdd = {
    product: productId,
    quantity,
  };
  const user = await User.findById(req.user.id);
  const cartItemPresent = user.cartItems.find((r) => r.product == itemToAdd.product);

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
  );

  res.status(200).json({
    success: true,
    noOfItems: updatedUser?.cartItems.length,
    items: updatedUser?.cartItems,
  });
});



export const deleteItemToCart = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.body;
  const user = await User.findById(req.user.id);

  const newCart = user.cartItems?.filter((i) => {
    return i.product != productId})

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { cartItems: newCart },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    noOfItems: updatedUser?.cartItems.length,
    items: updatedUser?.cartItems,
  });
})