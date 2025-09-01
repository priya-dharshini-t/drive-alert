import React from 'react';

const AuthButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white w-full py-3 mt-3 rounded-lg font-bold hover:bg-red-600 hover:shadow-md transition duration-300"
    >
      {text}
    </button>
  );
};

export default AuthButton;
