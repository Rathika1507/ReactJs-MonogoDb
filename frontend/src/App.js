import './App.css';
import Header from './components/Header';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Cart from './pages/Cart';

function Layout({ cartItems, setCartItems }) {
  const location = useLocation();
  const hideHeaderPaths = ['/']; // Add '/register' here if separate path
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      <ToastContainer theme='dark' position='bottom-center' />
      {!shouldHideHeader && <Header cartItems={cartItems} />}
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/Home" element={<Home />} />
        <Route
          path="/Product/:id"
          element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="App">
      <Router>
        <Layout cartItems={cartItems} setCartItems={setCartItems} />
      </Router>
    </div>
  );
}

export default App;
