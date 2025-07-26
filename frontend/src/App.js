// App.jsx
import './App.css';
import Header from './components/Header';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import OrderHistory from './pages/OrderHistory';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Cart from './pages/Cart';
import { AuthProvider } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


function Layout({ cartItems, setCartItems }) {
  const location = useLocation();
  
  const hideHeaderPaths = ['/Auth'];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      <ToastContainer theme='dark' position='bottom-center' />

      {!shouldHideHeader && <Header cartItems={cartItems} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Auth" element={<Auth />} />
        <Route
          path="/Product/:id"
          element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route path="/search" element={<Home />} />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <AuthProvider>
      <Router>
        <Layout cartItems={cartItems} setCartItems={setCartItems} />
      </Router>
    </AuthProvider>
  );
}

export default App;