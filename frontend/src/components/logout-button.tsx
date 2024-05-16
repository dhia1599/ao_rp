import React from 'react';
import { removeToken } from '../helpers/jwt';

const LogoutButton = () => {

  const handleLogout = async () => {
    try {
      removeToken();
      window.location.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="text-white bg-red-700 hover:bg-red-500 px-3 py-2 rounded-md">
      Logout
    </button>
  );
};

export default LogoutButton;