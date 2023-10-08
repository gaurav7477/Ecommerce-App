import './App.css';
import Header from './components/Layout/Header/Header.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Footer from './components/Layout/Footer/Footer.js';
import Home from './components/Home/Home';
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
      <Footer />

    </Router>
  );
}

export default App;