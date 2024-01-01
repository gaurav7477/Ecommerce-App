import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({item, deleteCartItems }) => {
  const {product} = item
  return (
    <div className="CartItemCard">
      {/* {console.log("item - product",product)} */}
      <img src={product.image} alt="ssa" />
      <div>
        <Link to={`/product/${product._id}`}>{product.name}</Link>
        <span>{`Price: ₹${product.price}`}</span>
        <p onClick={() => deleteCartItems(product._id)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
