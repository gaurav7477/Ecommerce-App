import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productsReducer,
    productDetailsReducer,
} from "./reducers/productReducer.js";



const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
});

let initialState = {};

const middleware = [thunk];
// create store
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

