import React from 'react';

const Button = ({ title, onClick }) => {
  return (
    <button
      className="p-2 text-xs text-white uppercase rounded-xl whitespace-nowrap "
      style={{
        background: 'linear-gradient(to right, #146C94, #146C50)',
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
