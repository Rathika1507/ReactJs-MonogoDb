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
import { AuthProvider, useAuth } from './AuthContext'; // 👈 Import Auth context
import PrivateRoute from './components/PrivateRoute';   // 👈 Import PrivateRoute
import 'bootstrap/dist/css/bootstrap.min.css';


// Layout component with routing
function Layout({ cartItems, setCartItems }) {
  const location = useLocation();
  const hideHeaderPaths = ['/']; // Hide header on login page
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      <ToastContainer theme='dark' position='bottom-center' />
      {!shouldHideHeader && <Header cartItems={cartItems} />}
      <Routes>
        <Route path="/" element={<Auth />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/Home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/Product/:id"
          element={
            <PrivateRoute>
              <ProductDetail cartItems={cartItems} setCartItems={setCartItems} />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart cartItems={cartItems} setCartItems={setCartItems} />
            </PrivateRoute>
          }
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
      <AuthProvider> {/* 👈 Wrap everything in AuthProvider */}
        <Router>
          <Layout cartItems={cartItems} setCartItems={setCartItems} />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
