import React, { useEffect, useState } from 'react';
import logo from '../assets/img/logo.png';
import { getToken, decode } from '../helpers/jwt';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = getToken();
    const decodedToken = decode(token);
    setIsConnected(decodedToken !== null);
  }, []);

  return (
    <nav
      className="sticky top-0 w-full"
      style={{ background: 'linear-gradient(to right, #6bb5ce, #5e87c6, #493488)' }}
    >
      <div className="sm:px-3 w-full">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center">
            <img className="h-12 w-auto" src={logo} alt="Logo" />
          </div>
          {isConnected && (
            <div className="flex w-full items-center justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
