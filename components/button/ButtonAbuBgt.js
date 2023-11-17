import React from 'react';
import Link from 'next/link';

const ButtonAbuBgt = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-sm font-medium text-green-600 transition-colors duration-500 bg-green-500 bg-opacity-20 rounded-xl hover:bg-opacity-40"
    >
      {title}
    </button>
  );
};

export default ButtonAbuBgt;
