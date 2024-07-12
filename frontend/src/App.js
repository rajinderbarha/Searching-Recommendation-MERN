import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import ProductDetail from './pages/ProductDetail.js';
import Cart from './pages/Cart.js';
import { SearchProvider } from './context/SearchContext.js';
import Info from './pages/Info.js';

function App() {
  return (
    <SearchProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/info" element={<Info />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
