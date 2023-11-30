import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Layout/Header/Header.js";
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";

import Footer from "./components/Layout/Footer/Footer.js";
import Home from "./components/Home/Home";
import ProductDeatils from "./components/Product/ProductDeatils.js";
import products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import webFont from "webfontloader";
import LoginSignUp from "./components/User/LoginSignUp";

import store from "./store";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./components/Layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./components/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import  OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";


function App() {
  const { isAuthenicatedUser, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka", "sans-serif"],
      },
    });
    // for storing user data in local storage while refreshing the page
    store.dispatch(loadUser());
    // for stripe payment
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenicatedUser && <UserOptions user={user} />}

      <Route path="/" component={Home} exact />
      <Route path="/product/:id" component={ProductDeatils} exact />
      <Route path="/products" component={products} exact />
      <Route path="/products/:keyword" component={products} />
      <Route path="/search" component={Search} />
      <Route exact path="/Cart" component={Cart} />

      <Route path="/login" component={LoginSignUp} />

      <ProtectedRoute exact path="/account" component={Profile} />

      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />

      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />

      <ProtectedRoute exact path="/shipping" component={Shipping} />

      
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/payment/process" component={Payment} />
        </Elements>

        <ProtectedRoute exact path="/success" component={OrderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        <Switch>
          <ProtectedRoute exact path="/confirm" component={ConfirmOrder} />
          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        </Switch>

        <ProtectedRoute exact path="/admin/dashboard" isAdmin={true} component={Dashboard} />

        
     

      <Footer />
    </Router>
  );
}

export default App;
