import React from 'react';
import './App.css';
import Header from './components/Layout/Header/Header.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from './components/Layout/Footer/Footer.js';
import Home from './components/Home/Home';
import ProductDeatils from './components/Product/ProductDeatils.js';
import products from './components/Product/Products.js';
import Search from './components/Product/Search.js';
import webFont from 'webfontloader';
import LoginSignUp from './components/User/LoginSignUp';

import store from "./store";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./components/Layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from './components/User/UpdatePassword.js';
import ForgotPassword from './components/User/ForgotPassword.js';
import ResetPassword from './components/User/ResetPassword.js';

function App() {

  const { isAuthenicatedUser, user } = useSelector(state => state.user);
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka', 'sans-serif'],
      },
    });
    // for storing user data in local storage while refreshing the page
    store.dispatch(loadUser());
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
      <Footer />
      <Route path="/login" component={LoginSignUp} />

      <ProtectedRoute exact path="/account" component={Profile} />

      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />


      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />



    </Router>
  );
}

export default App;