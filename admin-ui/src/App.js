
import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Order from "./pages/Order";
import Report from "./pages/Report";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/Report" element={<Report />} />
                  </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
