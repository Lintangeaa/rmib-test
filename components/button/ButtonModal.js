import React from 'react';

const ButtonModal = ({ variant, text, onClick }) => {
  let style = '';

  if (variant === 'ok') {
    style = 'bg-green-500 text-green-500 border-green-500';
  }
  if (variant === 'cancel') {
    style = 'bg-red-500 text-red-500 border-red-500';
  }
  return (
    <button
      className={`px-2 p-1 lg:max-w-[120px] min-w-[60px] bg-opacity-30 hover:bg-opacity-40 rounded-xl border text-xs ${style}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonModal;
