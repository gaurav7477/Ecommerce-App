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

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case LOAD_CART_REQUEST:
      return {
        loading: true,
      };
    case LOAD_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };
    case LOAD_CART_FAIL:
      return {
        loading: false,
        cartItems: null,
        error: action.payload,
      };
    case ADD_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        cartItems: action.payload.items,
      };
    case ADD_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        cartItems: action.payload.items,
      };
    case DELETE_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
