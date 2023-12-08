import React from 'react';
import { IoClose } from 'react-icons/io5';

const ActionButton = ({ variant }) => {
  let style = '';
  let text = '';

  if (variant === 'oke') {
    style = 'bg-green-500 text-green-500 border-green-500';
  } else if (variant === 'close') {
    style = 'bg-red-500 text-red-500 border-red-500';
    text = <IoClose />;
  } else if (variant === 'blue') {
    style = 'bg-blue-300 text-primary border-primary';
  }
  return (
    <div
      className={`p-1 items-center flex justify-center w-6 h-6 bg-opacity-30 hover:bg-opacity-40 rounded-lg border text-xs ${style}`}
    >
      {text}
    </div>
  );
};

export default ActionButton;
