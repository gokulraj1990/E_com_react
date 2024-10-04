import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Logout from './components/Logout';
import Products from './components/Products';

const App = () => {
  return (
    <Router>
      <div>
        <h1>E-Commerce App</h1>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Login />} /> {/* Redirect to login by default */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
