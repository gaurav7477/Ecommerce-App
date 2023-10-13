import './App.css';
import Header from './components/Layout/Header/Header.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Footer from './components/Layout/Footer/Footer.js';
import Home from './components/Home/Home';
import ProductDeatils from './components/Product/ProductDeatils.js';
import products from './components/Product/Products.js';
import Search from './components/Product/Search.js';
import webFont from 'webfontloader';



function App() {

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka', 'sans-serif'],
      },
    });
  }, []);


  return (
    <Router>

      <Header />
      <Route path="/" component={Home} exact />
      <Route path="/product/:id" component={ProductDeatils} exact />
      <Route path="/products" component={products} exact />
      <Route path="/products/:keyword" component={products} />
      <Route path="/search" component={Search} />
      <Footer />

    </Router>
  );
}

export default App;