import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-around">
        {/* Navigation Links */}
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/profile" className="hover:text-blue-400">
          Profile
        </Link>
        <Link to="/history" className="hover:text-blue-400">
          History
        </Link>
        <Link to="/login" className="hover:text-blue-400">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
