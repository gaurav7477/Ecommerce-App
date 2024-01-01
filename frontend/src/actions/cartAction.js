import {
  LOAD_CART_REQUEST,
  LOAD_CART_SUCCESS,
  LOAD_CART_FAIL,
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_FAIL,
  DELETE_CART_REQUEST,
  DELETE_CART_SUCCESS,
  DELETE_CART_FAIL,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";

export const loadCart = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_CART_REQUEST });

    const { data } = await axios.get(`/api/v1/me`);
    // console.log(data.user)
    dispatch({ type: LOAD_CART_SUCCESS, payload: data.user?.cartItems });
  } catch (error) {
    dispatch({ type: LOAD_CART_FAIL, payload: error.response.data.message });
  }
};

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_CART_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    // console.log(id, quantity);

    const { data } = await axios.put(
      `/api/v1/cart/add`,
      { productId: id, quantity },
      config
    );
    // console.log(data);
    dispatch({
      type: ADD_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_CART_FAIL,
      payload: error.response.data?.message,
    });
  }
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_CART_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/cart/add`,
      { productId: id },
      config
    );

    dispatch({
      type: DELETE_CART_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
