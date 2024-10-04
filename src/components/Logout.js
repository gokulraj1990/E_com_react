import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://127.0.0.1:8000/admin_console/logout/');
      localStorage.removeItem('token');
      alert('Successfully logged out');
      navigate('/login'); // Redirect to login page
    } catch (err) {
      alert('Error logging out. Please try again.');
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
