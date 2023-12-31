import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (_id, quantity, stock) => {

    const newQty = 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(_id, newQty));
  };

  const decreaseQuantity = (_id, quantity) => {
    const newQty = -1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(_id, newQty));
  };

  const deleteCartItems = (id) => {
    console.log('deleting id', id)
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems?.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
          {/* {cartItems && console.log('Item', cartItems[0])} */}
            {cartItems?.map((item) => (
            
              <div className="cartContainer" key={item.product._id}>
                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                <div className="cartInput">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.product._id, item.quantity)
                    }
                  >
                    -
                    </button>
                  <input type="number" value={item.quantity} readOnly />
                  <button
                    onClick={() =>
                      increaseQuantity(
                        item.product._id,
                        item.quantity,
                        item.product.Stock
                      )
                    }
                  >
                    +
                  </button>
                  {/* <p>`only ${item.product.Stock} stock is left `</p> */}
                </div>
                <p className="cartSubtotal">{`₹${item.product.price * item.quantity}`}</p>
              </div>
            ))}
          
            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems?.reduce(
                  (acc, item) => acc + item.quantity * item.product.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
